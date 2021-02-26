<template>
  <nav class="filter-nav-emp">
    <!-- <span v-for="(c, i, k) in clients" :key="k"> -->
    <button class="button_emp"
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
.filter-nav-emp {
    text-align: center;
}

.button_emp {
    margin-right: 5px;
    margin-left: 5px;
    margin-bottom: 10px;
    background-color: #ffffff00;
    border-radius: 6px;
    border-style: solid;
    padding: 5px 8px 4px 8px;
    border-color: white;
    border-width: 1px;
    color: white;
    font-variant: all-petite-caps;
    font-weight: 700;
        font-size: 18px !important;
}
.button_emp:hover {
    background-color: #72c7e7;
    border-color: #72c7e7;
}
.button_emp.active {
    background-color: #ffffff;
    border-color: #ffffff;
    color: #3978b7;
}
a {
    font-size: 13px;
}
</style>
