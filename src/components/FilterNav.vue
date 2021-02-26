<template>
  <nav class="filter-nav-cli">
    <button class="button_cli" @click="updateFilter('all')" :class="{ active: current === 'all' }">
      Tout
    </button>
    <button class="button_cli"
      @click="updateFilter('complet')"
      :class="{ active: current === 'complet' }"
    >
      Fait
    </button>
    <button class="button_cli"
      @click="updateFilter('encours')"
      :class="{ active: current === 'encours' }"
    >
      En cours
    </button>
  </nav>
</template>

<script>
export default {
  props: ["current"],
  methods: {
    updateFilter(by) {
      this.$emit("filterChange", by);
    },
  },
};
</script>

<style>
.filter-nav-cli {
    text-align: center;
}

.button_cli {
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
.button_cli:hover {
    background-color: #72c7e7;
    border-color: #72c7e7;
}
.button_cli.active {
    background-color: #ffffff;
    border-color: #ffffff;
    color: #3978b7;
}
a {
    font-size: 13px;
}
</style>