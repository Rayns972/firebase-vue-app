<template>
  <nav class="filter-nav">
    <!-- <span v-for="(c, i, k) in clients" :key="k"> -->
    <button
      v-for="(imp, index, key) in uniqClients"
      :key="key"
      @click="updateFilter(imp)"
      :class="{
        active:
          (!(current && current.id) && index == 0) || current.id === imp.id
      }"
    >
      {{ imp.name }}
    </button>
    <!-- </span> -->
  </nav>
</template>

<script>
export default {
  props: ["current", "clients"],
  methods: {
    updateFilter(by) {
      this.$emit("filterChange", by);
      console.log(by);
    }
  },
  computed: {
    uniqClients() {
      let data = [];
      this.clients.map(imp => {
        imp.articles.map(a => {
          let found = false;
          data.forEach(d => (d.name === a.name ? (found = true) : null));
          found ? null : data.push({ ...a });
        });
      });
      console.log(data);
      return data;
    }
  }
};
</script>

<style>
.filter-nav button {
  background: none;
  border: none;
  color: #fff;
  outline: none;
  font-size: 12px;
  text-transform: uppercase;
  margin-right: 10px;
  letter-spacing: 1px;
  font-weight: bold;
  cursor: pointer;
  padding: 0px 15px 0px 15px;
}
.material-icons:hover {
  color: #a7a7a7;
}
button {
  font-size: 16px !important;
}
.filtre {
  padding-bottom: 10px;
}

nav.filter-nav {
  margin-left: auto;

  width: 61%;
}
.filter-nav button.active {
  color: #fff;
  color: #4d94c7;
  background: #ffffff;
  padding: 5px 10px 5px 10px;
  border-radius: 10px;
}
</style>
