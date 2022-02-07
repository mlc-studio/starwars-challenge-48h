import { reactive } from "vue";

const store = reactive({
  loading: false,
});

const setStateProp = (propName, newValue) => {
  store[propName] = newValue;
};

export default { state: store, setStateProp };