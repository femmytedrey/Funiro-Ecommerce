import { defineStore } from "pinia";
import { auth } from "../FirebaseSetup/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
} from "firebase/auth";
import Cookies from "js-cookie";
import axios from "axios";
import { toRaw } from "vue";

const AUTH_COOKIE_NAME = "isAuthenticated";
const USER_DATA_COOKIE_NAME = "userData";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(Cookies.get(USER_DATA_COOKIE_NAME) || "{}"),
    isAuthenticated: Cookies.get(AUTH_COOKIE_NAME) === "true",
    errors: {},
    loading: false,
    users: [],
  }),
  actions: {
    async validateUserData(userData, options = { validateName: true }) {
      this.clearErrors();

      const { firstName, lastName, email, password } = userData;

      if (options.validateName) {
        if (!firstName) {
          this.setError("firstName", "First name is required");
        }
        if (!lastName) {
          this.setError("lastName", "Last name is required");
        }
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        this.setError("email", "Email is required");
      } else if (!emailRegex.test(email)) {
        this.setError("email", "Invalid email address");
      }

      if (!password) {
        this.setError("password", "Password is required");
      } else if (password.length < 8) {
        this.setError(
          "password",
          "Password must be at least 8 characters long"
        );
      }
    },

    async signup(userData) {
      this.loading = true;

      this.validateUserData(userData);

      if (Object.keys(this.errors).length > 0) {
        this.loading = false;
        return;
      }

      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );

        const idToken = await user.getIdToken(true);

        this.user = {
          uid: user.uid,
          email: user.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
        };

        this.isAuthenticated = true;
        Cookies.set(AUTH_COOKIE_NAME, true, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });

        await this.storeUser(this.user, idToken);

        await this.login({
          email: userData.email,
          password: userData.password,
        });
      } catch (error) {
        this.handleFirebaseError(error.code);
      } finally {
        this.loading = false;
      }
    },

    //store user's in the backend
    async storeUser(user, idToken) {
      this.loading = true;
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_BASE_URL}/users/store-user`,
          user,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        this.user = response.data;
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loading = false;
      }
    },

    async login(userData) {
      this.loading = true;
      const { email, password } = userData;
      this.validateUserData({ email, password }, { validateName: false });

      if (Object.keys(this.errors).length > 0) {
        this.loading = false;
        return;
      }

      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        this.user = {
          uid: user.uid,
          email: user.email,
        };

        const idToken = await user.getIdToken(true);
        this.token = idToken;
        console.log(idToken);

        await this.updateUser(this.user, idToken);

        this.isAuthenticated = true;
        Cookies.set(AUTH_COOKIE_NAME, true, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
      } catch (error) {
        this.handleFirebaseError(error.code);
      } finally {
        this.loading = false;
      }
    },

    //updateUser
    async updateUser(user, idToken) {
      this.loading = true;
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_BASE_URL}/users/update-user`,
          user,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        this.user = response.data;
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loading = false;
      }
    },

    async deleteUser(userId) {
      this.loading = true;
      try {
        const user = auth.currentUser;

        if (!user) {
          throw new Error("Admin not authenticated");
        }

        const idToken = await user.getIdToken(true);
        const response = await axios.delete(
          `${process.env.VUE_APP_BASE_URL}/users/delete-user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        //console.log(response.data?.message);
      } catch (error) {
        console.error("Error deleting user:", error.message);
        this.handleFirebaseError(error.code || "general");
      } finally {
        this.loading = false;
      }
    },

    async toggleAdminRole(userId) {
      this.loading = true;

      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error("Admin not authenticated");
        }
        const idToken = await user.getIdToken(true);
        const response = await axios.patch(
          `${process.env.VUE_APP_BASE_URL}/users/toggle-admin`,
          { uid: userId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
      } catch (error) {
        console.error("Error toggling admin role:", error.message);
      } finally {
        this.loading = false;
      }
    },

    async resetPassword(email) {
      this.clearErrors();
      this.loading = true;
      try {
        await sendPasswordResetEmail(auth, email);
        console.log("Password reset link sent successfully");
      } catch (error) {
        this.handleFirebaseError(error.code);
      } finally {
        this.loading = false;
      }
    },

    async getUsers() {
      this.loading = true;
      try {
        const user = await auth.currentUser;
        if (user) {
          const idToken = await user.getIdToken(true);
          const response = await axios.get(
            `${process.env.VUE_APP_BASE_URL}/users`,
            {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            }
          );

          if (response.data) {
            this.users = response.data;
            return this.users;
          } else {
            console.log("No users found in the response.");
          }
        }
      } catch (error) {
        console.log("Error fetching users:", error.message);
      } finally {
        this.loading = false;
      }
    },

    async signInWithGoogle() {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const tokenId = await user.getIdToken(true);

        this.user = {
          uid: user.uid,
          email: user.email,
          firstName: user.displayName.split(" ")[0],
          lastName: user.displayName.split(" ")[1],
        };

        try {
          await axios.get(
            `${process.env.VUE_APP_BASE_URL}/users/get-user/${user.uid}`,
            {
              headers: {
                Authorization: `Bearer ${tokenId}`,
              },
            }
          );
          await this.updateUser(this.user, tokenId);
        } catch (error) {
          await this.storeUser(this.user, tokenId);
        }

        this.isAuthenticated = true;
        Cookies.set(AUTH_COOKIE_NAME, true, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
      } catch (error) {
        this.handleFirebaseError(error.code);
      }
    },

    async logout() {
      try {
        await signOut(auth);
        this.resetUserData();
        this.isAuthenticated = false;
        Cookies.remove(AUTH_COOKIE_NAME);
      } catch (error) {
        console.error("Sign out error:", error);
      }
    },

    setError(field, message) {
      this.errors = {
        ...this.errors,
        [field]: message,
      };
    },
    clearErrors() {
      this.errors = {};
    },
    resetUserData() {
      this.user = {};
    },

    handleFirebaseError(code) {
      switch (code) {
        case "auth/email-already-in-use":
          this.setError("email", "Email already in use");
          break;
        case "auth/invalid-email":
          this.setError("email", "Invalid email address");
          break;
        case "auth/operation-not-allowed":
          this.setError("general", "Operation not allowed");
          break;
        case "auth/weak-password":
          this.setError("password", "Password is too weak");
          break;
        case "auth/user-disabled":
          this.setError("general", "User account is disabled");
          break;
        case "auth/user-not-found":
          this.setError("general", "No user found with this email");
          break;
        case "auth/wrong-password":
          this.setError("general", "Incorrect password");
          break;
        case "auth/invalid-credential":
          this.setError("password", "Invalid credential. Please try again.");
          break;
        default:
          this.setError("general", "An unknown error occurred");
      }
    },

    initAuthState() {
      onAuthStateChanged(auth, async (user) => {
        if (user && this.isAuthenticated === true) {
          try {
            if (!Cookies.get(USER_DATA_COOKIE_NAME)) {
              const idToken = await user.getIdToken(true);
              const response = await axios.get(
                `${process.env.VUE_APP_BASE_URL}/users/get-user/${user.uid}`,
                {
                  headers: {
                    Authorization: `Bearer ${idToken}`,
                  },
                }
              );
              this.user = {
                uid: user.uid,
                email: user.email,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                isAdmin: response.data.isAdmin,
              };
              Cookies.set(USER_DATA_COOKIE_NAME, JSON.stringify(this.user), {
                expires: 7,
                secure: true,
                sameSite: "Strict",
              });
            } else {
              this.user = JSON.parse(
                Cookies.get(USER_DATA_COOKIE_NAME || "{}")
              );
            }
          } catch (error) {
            console.log(error.message);
          }
        } else {
          this.user = {};
          this.isAuthenticated = false;
          Cookies.remove(AUTH_COOKIE_NAME);
          Cookies.remove(USER_DATA_COOKIE_NAME);
        }
      });
    },
  },
});
