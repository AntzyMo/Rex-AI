<script lang="ts" setup>
  useHead({
    link: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg'
      }
    ]
  })

  useSeoMeta({
    title: 'Rex AI',
    ogTitle: 'Rex AI',
    description: 'Rex AI',
    ogDescription: 'Rex AI'
    // ogImage: '/screenshot.png'
  })
  </script>

<template>
  <NuxtPage />
</template>
