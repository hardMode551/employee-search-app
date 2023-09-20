<template>
  <div class="app">
    <SiteHeader /> 
    <div class="container">
      <UserProfile />
      <ResultBlock/>
    </div>
  </div>
</template>

<script lang="ts">
import SiteHeader from '../components/SiteHeader.vue'; 
import UserProfile from '../components/UserProfile.vue'; 
import ResultBlock from '../components/ResultBlock.vue'; 


export default {
  name: 'HomePage',
  components: {
    SiteHeader,
    UserProfile,
    ResultBlock,
  },
};
</script>

<style>
@import '../style/main.scss';
</style>
