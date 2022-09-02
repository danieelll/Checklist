<template>
  <div class="container mt-5 mb-5" style="width: 90 %">
    <div class="frame rounded">
      <h1 class="mt-5 mb-5 text-center">Sample Quotation Form</h1>

      <p id="total" class="p-2 mb-4 text-dark rounded" style="border: 5px solid #cb9547">
        TOTAL: {{ addtotal }}
      </p>

      <div class="container">
        <div class="row rounded" style="border: 5px solid #cb9547">
          <div class="col" style="border: 5px solid #b0ada8">
            <h6 class="mb-4 mt-4">Features group 1</h6>
            <div class="mb-3 pl-5" v-for="item in features1" :key="item">
              <label class="form-check-label">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :value="item.value"
                  :name="index"
                  v-model="item.selected"
                  @change="addprice2"
                />
                {{ item.label }}
              </label>
            </div>
          </div>

          <div class="col" style="border: 5px solid #b0ada8">
            <h6 class="mb-4 mt-4">Features group 3</h6>
            <div class="mb-3 pl-5" v-for="item in features2" :key="item">
              <label class="form-check-label">
                <input
                  class="form-check-input"
                  type="radio"
                  :value="item.value"
                  :name="index"
                  v-model="selectedfeature2"
                  @change="addprice2"
                />
                {{ item.label }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
  },
  data() {
    return {
      features1: [
        {
          label: "feature 1 (199₱)",
          value: 199,
          selected: false,
        },
        {
          label: "feature 2 (299₱)",
          value: 299,
          selected: false,
        },
        {
          label: "feature 3 (399₱)",
          value: 399,
          selected: false,
        },
        {
          label: "feature 4 (499₱)",
          value: 499,
          selected: false,
        },
      ],

      features2: [
        {
          label: "feature 1 (100₱)",
          value: 100,
        },
        {
          label: "feature 2 (200₱)",
          value: 200,
        },
        {
          label: "feature 3 (300₱)",
          value: 300,
        },
        {
          label: "feature 4 (400₱)",
          value: 400,
        },
      ],

      selectedfeature2: 0,
      addtotal: 0,
    };
  },
  created() {
    document.title = "Sample Quotation form";
  },

  methods: {
    addprice2() {
      var total = 0;

      this.features1.forEach((item) => {
        if (item.selected) {
          total += item.value;
        }
      });

      total += this.selectedfeature2;
      this.addtotal = total;
    },
  },
};
</script>
