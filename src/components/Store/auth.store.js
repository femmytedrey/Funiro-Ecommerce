import { defineStore } from "pinia";
import { auth } from "../FirebasaeSetup/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Cookies from "js-cookie";

const AUTH_COOKIE_NAME = "isAuthenticated";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {},
    isAuthenticated: Cookies.get(AUTH_COOKIE_NAME) === "true",
    errors: {},
    loading: false,
  }),
  actions: {
    async validateUserData(userData, options = { validateName: true }) {
      this.clearErrors();

      const { name, email, password } = userData;

      if (options.validateName && !name) {
        this.setError("name", "Name is required");
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
        await updateProfile(user, { displayName: userData.name });
        this.user = {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
        };
        console.log(this.user);
        this.isAuthenticated = true;
        Cookies.set(AUTH_COOKIE_NAME, true, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
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
          name: user.displayName,
        };
        console.log(this.user);
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

    async signInWithGoogle() {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        this.user = {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
        };
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
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = {
            uid: user.uid,
            email: user.email,
            name: user.displayName,
          };
          this.isAuthenticated = true;
          Cookies.set(AUTH_COOKIE_NAME, true, {
            expires: 7,
            secure: true,
            sameSite: "Strict",
          });
        } else {
          this.user = {};
          this.isAuthenticated = false;
          Cookies.remove(AUTH_COOKIE_NAME);
        }
      });
    },
  },
});
