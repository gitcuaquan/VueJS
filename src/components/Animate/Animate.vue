<template>
  <div>
    <transition
      appear
      enter-active-class="animated fadeInDown"
      leave-active-class="animated fadeOutDown"
    >
      <slot></slot>
    </transition>
  </div>
</template>
