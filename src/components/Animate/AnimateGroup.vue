<template>
  <div>
    <transition-group
      appear
      enter-active-class="animated fadeInDown"
      leave-active-class="animated fadeOutDown"
    >
      <slot></slot>
    </transition-group>
  </div>
</template>
