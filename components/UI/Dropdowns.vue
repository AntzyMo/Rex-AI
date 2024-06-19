<script setup lang="ts">

</script>

<template>
  <div class="relative">
    <div>
      <button
        class="w-full bg-white px-3 py-1.5 text-sm  text-gray-900   hover:bg-gray-50"
        flex="~ items-center gap-1.5 justify-between"
        border="~ gray-200 rounded-md"
      >
        <span>Options</span>
        <span i-carbon:chevron-down class="text-base text-gray-400" />
      </button>
    </div>

    <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  -->
    <div
      class="absolute w-full z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
    >
      <div class="py-1" role="none">
        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
        <a
          id="menu-item-0"
          href="#"
          class="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          tabindex="-1"
        >Account settings</a>
        <a
          id="menu-item-0"
          href="#"
          class="block px-4 py-2 text-sm bg-gray-100 text-gray-900"
          role="menuitem"
          tabindex="-1"
        >Account settings</a>
        <a
          id="menu-item-1"
          href="#"
          class="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          tabindex="-1"
        >Support</a>
        <a
          id="menu-item-2"
          href="#"
          class="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          tabindex="-1"
        >License</a>
        <form method="POST" action="#" role="none">
          <button
            id="menu-item-3"
            type="submit"
            class="block w-full px-4 py-2 text-left text-sm text-gray-700"
            role="menuitem"
            tabindex="-1"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
