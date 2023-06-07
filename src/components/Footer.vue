<template>
  <footer class="footer">
    <div class="text-center p-3 text-light">
      <a class="text-light" href="#">RAF News</a>
      <br>
      © 2023 Company - All rights reserved.
      <br>

      <p class="text-gray" id="infoP">Web Programiranje - 6. semestar Racunarski fakultet
      </p>
    </div>

  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {

    }
  }
}
</script>
<style>
.footer {
  background-color: #0b111a;
  width: 100%;
  bottom: 0;
}

#infoP {
  color: #73728a;
}
</style>