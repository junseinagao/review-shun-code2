const app = new Vue({
  el: "#app",
  data: {
    patientInfo: [{ name: "", age: "", weight: "", height: "", status: "" }],
    inputName: "",
    inputAge: "",
    inputWeight: "",
    inputHeight: "",
    tempStatus: "",
  },
  methods: {
    submit: function () {
      this.calcStatus();
      this.patientInfo.push({
        name: this.inputName,
        age: this.inputAge,
        weight: this.inputWeight,
        height: this.inputHeight,
        status: this.tempStatus,
      });
      localStorage.localList = JSON.stringify(this.patientInfo);
    },
    eliminate: function (index) {
      this.patientInfo.splice(index, 1);
    },
    calcStatus: function () {
      let bmi = this.inputWeight / (this.inputHeight / 100) ** 2;
      if (this.inputWeight == "" || this.inputHeight == "") {
        this.tempStatus = "";
      } else if (bmi <= 18.5) {
        this.tempStatus = "Underweight";
      } else if (bmi <= 24.9) {
        this.tempStatus = "Normal";
      } else if (bmi <= 29.9) {
        this.tempStatus = "OverWeight";
      } else {
        this.tempStatus = "Obese";
      }
      console.log(bmi);
    },
  },
  mounted: function () {
    this.patientInfo = JSON.parse(localStorage.localList);
  },
  watch: {
    patientInfo: function () {
      localStorage.localList = JSON.stringify(this.patientInfo);
    },
  },
});
