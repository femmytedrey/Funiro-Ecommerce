<template>
  <div
    class="bg px-7 md:px-20 2xl:px-52 relative py-28 mb-20 flex flex-col justify-center items-center"
  >
    <div class="absolute inset-0 bg-white/40 backdrop-blur-sm z-0"></div>
    <div class="z-10 text-center space-y-3">
      <p class="text-4xl font-medium">Checkout</p>
      <p class="text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    </div>
  </div>
  <div
    class="px-7 md:px-20 2xl:px-52 grid gap-x-12 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mb-8"
  >
    <div class="space-y-7 col-span-1 xl:col-span-2">
      <h1 class="text-3xl 2xl:text-4xl font-semibold pb-3">Billing details</h1>
      <div class="grid grid-cols-2 gap-x-5">
        <div>
          <InputField
            label="First Name"
            placeholder="e.g John"
            id="fname"
            type="text"
            v-model="firstName"
            :errorMessage="validationError?.firstName"
          />
        </div>
        <div>
          <InputField
            label="Last Name"
            placeholder="e.g Doe"
            id="lname"
            type="text"
            v-model="lastName"
            :errorMessage="validationError?.lastName"
          />
        </div>
      </div>
      <InputField
        label="Email"
        placeholder="e.g john@example.com"
        id="email"
        type="email"
        v-model="email"
        :errorMessage="validationError?.email"
      />
      <InputField
        label="Shipping Address"
        placeholder="e.g 123 Main Street"
        id="address"
        type="text"
        v-model="shippingAddress"
        :errorMessage="validationError?.shippingAddress"
      />

      <!-- TODO: Phone Number component -->
      <InputField
        label="Phone Number"
        placeholder="e.g +1234567890"
        id="phone"
        type="tel"
        v-model="phone"
        :errorMessage="validationError?.phone"
      />

      <InputField
        label="Company Name (Optional)"
        placeholder="e.g ABC Corporation"
        id="companyName"
        type="text"
        v-model="companyName"
      />

      <!--Country/State selection-->
      <div class="grid grid-cols-2 gap-x-5">
        <div>
          <label
            for="country"
            class="block text-gray-700 text-base 2xl:text-2xl"
            >Country</label
          >
          <select
            v-model="selectedCountry"
            id="country"
            class="w-full text-base 2xl:text-xl p-4 border-[1.5px] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mt-3"
          >
            <option value="" disabled selected>Select a country</option>
            <option
              v-for="country in countries"
              :key="country.isoCode"
              :value="country"
            >
              {{ country.name }}
            </option>
          </select>
        </div>
        <div>
          <label for="state" class="block text-gray-700 text-base 2xl:text-2xl"
            >State</label
          >
          <select
            v-model="selectedState"
            id="state"
            class="w-full text-base 2xl:text-xl p-4 border-[1.5px] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mt-3"
          >
            <option value="" disabled selected>Select a state</option>
            <option v-for="state in states" :key="state.isoCode" :value="state">
              {{ state.name }}
            </option>
          </select>
        </div>
      </div>

      <InputField
        label="City"
        placeholder="e.g New York"
        id="city"
        type="text"
        v-model="city"
        :errorMessage="validationError?.city"
      />
      <InputField
        label="Zip Code"
        placeholder="e.g 12345"
        id="zipcode"
        type="text"
        v-model="zipCode"
        :errorMessage="validationError?.zipCode"
      />

      <InputField
        label="Additional Information (optional)"
        placeholder="e.g Leave a note for the seller"
        id="additionalInfo"
        type="text"
        v-model="additionalInformation"
      />
    </div>
    <div class="mt-10 flex flex-col gap-y-6">
      <div class="flex justify-between font-medium text-xl">
        <p>Product</p>
        <p>Subtotal</p>
      </div>
      <div class="space-y-5">
        <div
          class="flex justify-between text-sm text-gray-600 items-center"
          v-for="item in cartStore.cart.items"
          :key="item._id"
        >
          <!-- import images -->
          <div class="flex gap-2 items-center">
            <img
              :src="item.product.images[0]"
              alt="dkk"
              class="h-12 w-12 rounded"
            />
            <p>{{ item.product.name }} X 1</p>
          </div>
          <p>{{ formatCurrency(item.product.price) }}</p>
        </div>
        <div class="flex justify-between text-sm text-gray-600">
          <p>Subtotal</p>
          <p>{{ formatCurrency(cartStore.cart.total) }}</p>
        </div>
        <div class="flex justify-between text-sm text-gray-600">
          <p>Total</p>
          <p class="text-primary font-bold text-lg">
            {{ formatCurrency(cartStore.cart.total) }}
          </p>
        </div>
      </div>
      <div class="space-y-4 border-t pt-4">
        <h3 class="font-medium text-lg">Payment Method</h3>
        <div class="flex flex-col gap-y-4 text-sm">
          <label
            class="flex items-center p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors"
            :class="{
              'border-primary bg-primary/5': selectedPaymentMethod === 'card',
            }"
          >
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              v-model="selectedPaymentMethod"
              class="hidden"
            />
            <div class="flex items-center gap-3">
              <div
                class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                :class="{
                  'border-primary': selectedPaymentMethod === 'card',
                }"
              >
                <div
                  class="w-3 h-3 rounded-full bg-primary"
                  v-show="selectedPaymentMethod === 'card'"
                ></div>
              </div>
              <div class="flex items-center gap-2">
                <i class="fa-regular fa-credit-card text-lg"></i>
                <span>Credit/Debit Card</span>
              </div>
            </div>
          </label>

          <label
            class="flex items-center p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors"
            :class="{
              'border-primary bg-primary/5':
                selectedPaymentMethod === 'cashOnDelivery',
            }"
          >
            <input
              type="radio"
              name="paymentMethod"
              value="cashOnDelivery"
              v-model="selectedPaymentMethod"
              class="hidden"
            />
            <div class="flex items-center gap-3">
              <div
                class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                :class="{
                  'border-primary': selectedPaymentMethod === 'cashOnDelivery',
                }"
              >
                <div
                  class="w-3 h-3 rounded-full bg-primary"
                  v-show="selectedPaymentMethod === 'cashOnDelivery'"
                ></div>
              </div>
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-money-bill text-lg"></i>
                <span>cash on Delivery</span>
              </div>
            </div>
          </label>
        </div>
      </div>
      <!-- {{ selectedPaymentMethod }} -->
      <div class="mt-3 flex justify-center mx-16 lg:mx-9">
        <button
          class="w-full p-3 px-8 sm:px-12 rounded-2xl border-black border hover:bg-primary hover:border-none hover:text-white transition-all duration-200 ease-in-out"
          type="submit"
          @click="handlePlaceOrder"
        >
          Place order
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import InputField from "@/components/ReusableComponent/InputField.vue";
import { useCartStore } from "@/components/Store/useCartStore";
import { computed, onMounted, onUpdated, ref } from "vue";
import { Country, State, City } from "country-state-city";
import { formatCurrency } from "@/utils/formatters";
import { useCheckoutStore } from "@/components/Store/checkout.store";
import { useAuthStore } from "@/components/Store/auth.store";
import { useRouter } from "vue-router";

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const phone = ref("");
const shippingAddress = ref("");
const companyName = ref("");
const city = ref("");
const zipCode = ref("");
const additionalInformation = ref("");
const selectedCountry = ref("");
const selectedState = ref("");
const selectedPaymentMethod = ref("card");
const authUser = useAuthStore();

const router = useRouter()

const validationError = ref({});

const cartStore = useCartStore();
const auth = useAuthStore();
const checkout = useCheckoutStore();
onMounted(async () => {
  await cartStore.fetchCart();
  await checkout.fetchCheckout();

  firstName.value = auth.user.firstName || "";
  lastName.value = auth.user.lastName || "";
  email.value = auth.user.email || "";
});


// Get all countries
const countries = computed(() => {
  return Country.getAllCountries();
});

// Get states based on selected country
const states = computed(() => {
  if (!selectedCountry.value) return [];
  return State.getStatesOfCountry(selectedCountry.value.isoCode);
});

const handlePlaceOrder = async () => {
  try {
    const deliveryDetails = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      shippingAddress: shippingAddress.value,
      phone: phone.value,
      companyName: companyName.value || "",
      country: selectedCountry.value?.name,
      state: typeof selectedState.value === 'object' ? selectedState.value.name : selectedState.value,
      city: city.value,
      zipCode: zipCode.value,
      additionalInformation: additionalInformation.value || "",
    };
    
    const result = await checkout.createCheckout(
      deliveryDetails,
      selectedPaymentMethod.value
    );

    if (result.success) {
      if (selectedPaymentMethod.value === "card") {
        const sessionResult = await checkout.createCheckoutSession(result.checkout._id);        
        if (sessionResult.success) {
          window.location.href = sessionResult.url;
        }
      } else {
        // Handle cash on delivery
        router.push({
          path: "/checkout/success",
          query: { orderId: result.checkout._id}
        })
      }
    } else {
      validationError.value = result.validationErrors;
    }
  } catch (error) {
    console.error('Error:', error);
    validationError.value = error.message;
  }
};


// onMounted(() => {
//   checkout.fetchCheckout();
// });
</script>

<style scoped>
.bg {
  background-image: url("@/assets/sofa.jpg");
  background-position: center;
  filter: grayscale(30%);
}
</style>
