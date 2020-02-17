<template>
  <header class="d-flex justify-content-between">
    <a
      :href="`${$store.state.common.publicPath}`"
      title="extraSlice"
      class="logo"
    >
      <img
        v-if="isSearchRequired"
        :src="`${$store.state.common.publicPath}img/logo-white.svg`"
        alt="extraSlice"
      />
      <img
        v-if="!isSearchRequired"
        :src="`${$store.state.common.publicPath}img/logo.svg`"
        alt="extraSlice"
      />
    </a>
    <nav class="nav">
      <ul class="d-flex nav__list">
        <li class="nav__item" v-if="isAdmin">
          <a
            href="javascript:;"
            :class="
              isSearchRequired
                ? 'dropdown__toggle_white'
                : 'dropdown__toggle_black'
            "
            class="nav__link"
            title="AdminDashboard"
            @click="redirectToAdmin"
            >Admin Dashboard</a
          >
        </li>

        <li class="nav__item position-relative" v-if="!isUser">
          <a
            href="javascript:;"
            @click="openModal(false, true)"
            class="nav__link js-modalLogin"
            title="Signup"
            >Signup</a
          >
          <div class="modal__card modal__card--right" v-if="isSignUp">
            <div class="fieldFloating mb20">
              <input
                type="text"
                placeholder=" "
                v-model="signUpForm.name"
                class="formControl"
              />
              <label class="fieldFloating__label required-field"
                >Full name</label
              >
              <span v-if="$v.signUpForm.name.$error" style="color:red;"
                >Name is required</span
              >
            </div>
            <div class="fieldFloating mb20">
              <input
                type="text"
                placeholder=" "
                v-model="signUpForm.email"
                class="formControl"
                @input="onInput()"
              />
              <label class="fieldFloating__label required-field">Email</label>
              <span v-if="$v.signUpForm.email.$error" style="color:red;"
                >Email must be valid</span
              >
              <span v-if="emailValidate" style="color:red;">
                {{ emailValidate }}
              </span>
            </div>
            <div class="fieldFloating mb20">
              <input
                type="number"
                placeholder=" "
                v-model="signUpForm.mobile"
                class="formControl validate_number"
              />
              <label class="fieldFloating__label required-field">Mobile</label>
              <span v-if="$v.signUpForm.mobile.$error" style="color:red;"
                >Mobile number must between 6 to 10 digits</span
              >
            </div>
            <div class="fieldFloating mb20">
              <input
                type="password"
                placeholder=" "
                class="formControl"
                v-model="signUpForm.password"
              />
              <label class="fieldFloating__label required-field"
                >Password</label
              >
              <span v-if="$v.signUpForm.password.$error" style="color:red;"
                >Password must be at least 6 characters in length</span
              >
            </div>

            <div class="fieldFloating mb20">
              <input
                type="password"
                placeholder=" "
                v-model="signUpForm.c_password"
                class="formControl"
              />
              <label class="fieldFloating__label required-field"
                >Confirm Password</label
              >
              <span style="color:red;" v-if="$v.signUpForm.c_password.$error"
                >Confirm Password must be same as password</span
              >
            </div>

            <button
              class="btn btn--blue w100"
              title="SignUp"
              @click="handleSignUp"
            >
              SignUp
            </button>
          </div>
        </li>

        <li class="nav__item position-relative" v-if="!isUser">
          <a
            href="javascript:;"
            class="nav__link js-modalLogin"
            title="Login"
            @click="openModal(true, false)"
            >Login</a
          >
          <div class="modal__card modal__card--right" v-if="isLogin">
            <div class="fieldFloating mb20">
              <input
                type="text"
                placeholder=" "
                v-model="loginForm.username"
                class="formControl"
              />
              <label class="fieldFloating__label required-field">Email</label>
            </div>
            <span v-if="$v.loginForm.username.$error" style="color:red;"
              >Email must be valid</span
            >
            <div class="fieldFloating mb20">
              <input
                type="password"
                placeholder=" "
                class="formControl"
                v-model="loginForm.password"
                @keyup.enter="handleLogin"
              />
              <label class="fieldFloating__label required-field"
                >Password</label
              >
            </div>
            <span v-if="$v.loginForm.password.$error" style="color:red;"
              >Password required</span
            >
            <button
              class="btn btn--blue w100"
              title="Login"
              @click="handleLogin"
            >
              Login
            </button>
          </div>
        </li>

        <li
          class="nav__item dropdown test"
          v-if="isAdmin || isUser"
          v-click-outside="closeMenu"
        >
          <button
            type="button"
            :class="
              isSearchRequired
                ? 'dropdown__toggle_white'
                : 'dropdown__toggle_black'
            "
            class="dropdown__toggle dropdown__toggle--hasArrow js-dropdownToggle"
            @click="openMenu"
          >
            {{ name }}
            <i class="fas fa-caret-down"></i>
          </button>
          <div class="dropdown__menu">
            <!-- <a href="#" class="dropdown__link" title="Profile">Profile</a> -->
            <a
              href="javascript:;"
              @click="getContracts"
              class="dropdown__link"
              title="Setting"
              >Contracts</a
            >
            <div class="dropdown__divider"></div>
            <a
              @click="handleLogout"
              class="dropdown__link"
              title="Logout"
              style="cursor: pointer;"
              >Logout</a
            >
          </div>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import { regUser } from "../../api/user";
import {
  required,
  minLength,
  maxLength,
  sameAs,
  email
} from "vuelidate/lib/validators";
export default {
  name: "Header",
  data() {
    return {
      loginForm: {
        username: "", //admin@gmail.com(admin)
        password: "" //123456
      },
      signUpForm: {
        name: "", //mayuri@gmail.com(user)
        email: "", //mayuri@gmail.com(user)
        password: "",
        c_password: "",
        mobile: ""
      },
      loading: false,
      isLogin: false,
      isSignUp: false,
      emailValidate: ""
    };
  },
  computed: {
    ...mapGetters(["role", "name", "user"]),
    isAdmin() {
      return this.role === "admin";
    },
    isUser() {
      return this.user && this.user.name;
    },
    isSearchRequired() {
      return this.$route.path == "/";
    }
  },
  mounted() {},
  methods: {
    getContracts() {
      this.$router.push("/contracts");
    },
    onInput() {
      this.emailValidate = "";
    },
    openModal(isLogin, isSignUp) {
      this.isLogin = isLogin;
      this.isSignUp = isSignUp;
      var body = document.body;
      if (isSignUp) {
        setTimeout(function() {
          document
            .querySelector(".validate_number")
            .addEventListener("keypress", function(evt) {
              if (
                (evt.which != 8 && evt.which != 0 && evt.which < 48) ||
                evt.which > 57
              ) {
                evt.preventDefault();
              }
            });
        }, 0);
      }

      body.classList.toggle("is-modalOpen");
    },
    handleLogin() {
      this.$v.loginForm.$touch();
      if (this.$v.loginForm.$error) {
        return;
      }
      this.loading = true;
      this.$store
        .dispatch("user/login", this.loginForm)
        .then(() => {
          // if (this.role && this.role === 'admin') {
          //   this.$router.push({ path: this.redirect || '/admin' })
          // } else {
          //   this.$router.push({ path: '/' })
          // }
          this.$notify({
            group: "notify",
            type: "success",
            text: "Login successfully"
          });
          this.openModal();
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$notify({
            group: "notify",
            type: "error",
            text: err.response.data.error
          });
        });
    },
    handleSignUp() {
      this.$v.signUpForm.$touch();
      if (this.$v.signUpForm.$error) {
        return;
      }
      this.loading = true;
      regUser(this.signUpForm)
        .then(res => {
          this.$notify({
            group: "notify",
            type: "success",
            text: "User registered successfuly"
          });
          this.openModal();
          this.loading = false;
        })
        .catch(err => {
          if (err.response.data.data.email) {
            this.emailValidate = err.response.data.data.email[0];
          }
          this.loading = false;
        });
    },
    redirectToAdmin() {
      // this.$router.push({ path: "/admin" });
      // setTimeout(() => {
      //   this.$router.go(this.$router.currentRoute);
      // }, 500);
      // this.$router.push({ path: '/admin', reload: true })
      window.location.href = `${this.$store.state.common.publicPath}admin`;
    },
    async handleLogout() {
      await this.$store.dispatch("user/logout");
      this.$notify({
        group: "notify",
        type: "success",
        text: "logout successfully"
      });
      this.$router.push(`/`);
      
    },
    openMenu() {
      let testarray = document.getElementsByClassName("test");

      // testarray[0].className += " is-dropdownOpen";
      if (testarray[0].classList.contains("is-dropdownOpen")) {
        testarray[0].classList.remove("is-dropdownOpen");
      } else {
        testarray[0].classList.add("is-dropdownOpen");
      }
      // document.getElementsByClassName('test')[0].addClass('is-dropdownOpen')
    },
    closeMenu() {
      let testarray = document.getElementsByClassName("test");
      if (testarray[0] && testarray[0].classList.contains("is-dropdownOpen")) {
        testarray[0].classList.remove("is-dropdownOpen");
      }
    }
  },
  validations: {
    signUpForm: {
      name: {
        required
      },
      mobile: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(10)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      },
      c_password: {
        required,
        sameAsPassword: sameAs("password")
      }
    },
    loginForm: {
      username: {
        required
      },
      password: {
        required
      }
    }
  }
};
</script>

<style>
.dropdown__toggle_white {
  color: #ffffff !important;
}
.dropdown__toggle_black {
  color: #000000 !important;
}
</style>
