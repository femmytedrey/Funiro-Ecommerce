<template>
  <div class="relative flex gap-x-2 items-center w-8 justify-center">
    <!-- the hidden that's in this div -->
    <!-- <div
      class="hidden md:flex gap-x-1 outline-none rounded-3xl border bg-primaryLight w-[220px] transition-opacity duration-300"
      :class="{'opacity-0 invisible': !isSearchField, 'opacity-100 visible': isSearchField}"
    >
      <input
        type="text"
        v-model="searchQuery"
        @keyup.enter="triggerSearch"
        placeholder="enter keyword"
        class="text-black py-2 px-5 outline-none border-none bg-transparent w-[215px]"
      />
      <button @click="triggerSearch" class="bg-primary text-white rounded-full px-3">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </div> -->

    <div class="absolute top-9 md:top-14 -right-8 md:right-2">
      <div
        class="flex gap-x-1 outline-none rounded-3xl border bg-primaryLight w-[250px] shadow-xl drop-shadow-xl"
        v-if="isSearchField"
      >
        <input
          type="text"
          ref="searchInput"
          v-model="searchQuery"
          @keyup.enter="triggerSearch"
          placeholder="enter keyword"
          class="text-black py-2 px-5 outline-none border-none bg-transparent w-[215px]"
        />
        <button @click="triggerSearch" class="bg-primary text-white rounded-full px-3">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </div>

    <i
      class="fa-solid fa-magnifying-glass text-xl cursor-pointer"
      @click="toggleSearch"
      v-if="!isSearchField"
    ></i>

    <i
      class="fa-solid fa-times text-xl cursor-pointer ml-2"
      @click="toggleSearch"
      v-if="isSearchField"
    ></i>

    <!-- {{searchQuery}} -->
  </div>
</template>

<script>
import { nextTick, ref } from "vue";
import { useRouter } from 'vue-router';
export default {
  setup() {
    const isSearchField = ref(false);
    const searchQuery = ref("")
    const router = useRouter()
    const searchInput = ref(null)



    const toggleSearch = () => {
      isSearchField.value = !isSearchField.value;
      if(isSearchField.value){
        nextTick(() => {
          searchInput.value.focus()
        })
      }
    };

    const triggerSearch = () => {
      if(!searchQuery.value){
        return alert('Please enter a keyword')
      }
      isSearchField.value = false
      router.push({name: "SearchResults", query:{q: searchQuery.value}})
      searchQuery.value=""
    }

    return {
      toggleSearch,
      isSearchField,
      searchQuery,
      triggerSearch,
      searchInput,
    };
  },
};
</script>

<style scoped></style>
