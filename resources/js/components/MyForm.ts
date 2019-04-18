import Vue from "vue";
import Component from "vue-class-component";
import { Form } from "../util/Form";

@Component({
  template: `
  <div>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input
          type="text"
          class="input"
          :class="form.hasError('email') ? 'is-danger' : ''"
          placeholder="Email"
          v-model="form.inputs.email"
          @keydown="form.check('email', $event.target.value)"
        >
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-check"></i>
        </span>
      </p>
    </div>
    <small
      class="error-text has-text-danger"
      v-text="form.errors.email[0]"
    ></small>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input
          type="text"
          class="input"
          :class="form.hasError('name') ? 'is-danger' : ''"
          placeholder="Name"
          v-model="form.inputs.name"
          @keydown="form.check('name', $event.target.value)"
        >
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-check"></i>
        </span>
      </p>
    </div>
    <small
      class="error-text has-text-danger"
      v-text="form.errors.name[0]"
    ></small>
    <div class="field">
      <p class="control">
        <button
          class="button"
          type="reset"
          @click="form.cancel()"
         >
          リセット
        </button>
        <button
          class="button is-success"
          type="button"
          @click="form.post(url)"
          :disabled="form.hasErrors()"
        >
          送信
        </button>
      </p>
    </div>
  </div>
`
})

export default class MyForm extends Vue {
  url: string = "login";
  form: Form = new Form({
    email: { max: 10, min: 4, required: true, email: true },
    name: { max: 5, required: true }
  });
}
