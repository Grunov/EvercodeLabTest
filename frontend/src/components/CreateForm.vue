<template lang="pug">
    form.form.create-form(@submit.prevent="submitHandler")

        .alert.alert-danger(v-if="submitStatus === 'ERROR'") Please fill the form correctly.
        .alert.alert-danger(v-if="errors") {{errors.message}}
        div.d-flex.align-items-center.mb-4(v-if="submitStatus === 'REQUEST'")
            .spinner-border.text-warning.me-3
            span Loading.. 

        .mb-3    
            label.form-label(for="name") Name
            input.form-control(
                :class="validationNameClasses",
                type="text", 
                id="name", 
                v-model.trim="$v.name.$model"
            )
            .invalid-feedback(
                v-if="$v.name.$dirty && !$v.name.required"
            ) Field is required

            .invalid-feedback(
                v-if="$v.name.$dirty && !$v.name.matches"
            ) Can only contain letters a-Z and numbers

            .invalid-feedback(
                v-if="$v.name.$dirty && !$v.name.maxLength"
            ) No longer than {{$v.name.$params.maxLength.max}} characters
           
    
        .mb-3    
            label.form-label(for="ticker") Ticker
            input.form-control(
                :class="validationTickerClasses",
                type="text", 
                id="natickerme", 
                v-model.trim="$v.ticker.$model"
            )
            .invalid-feedback(
                v-if="$v.ticker.$dirty && !$v.ticker.required"
            ) Field is required

            .invalid-feedback(
                v-if="$v.ticker.$dirty && !$v.ticker.matches"
            ) Can only contain letters a-Z and numbers

            .invalid-feedback(
                v-if="$v.ticker.$dirty && !$v.ticker.minLength"
            ) No shorter than {{$v.ticker.$params.minLength.min}} characters
    
            .invalid-feedback(
                v-if="$v.ticker.$dirty && !$v.ticker.maxLength"
            ) No longer than {{$v.ticker.$params.maxLength.max}} characters

        button.btn.btn-success.w-100(type="submit") Create
</template>

<script>
import { required, minLength, maxLength, helpers } from 'vuelidate/lib/validators';
import {mapActions, mapGetters } from 'vuex';
import {
    GET_ERRORS,
    CREATE_CURRENCY_API
} from '@/store/constants'

const matches = helpers.regex('matches', /^[A-Za-z0-9]*$/);

export default {
    name: 'create-form',
    data: () => ({
        name: '',
        ticker: '',
        submitStatus: null
    }),
    validations: {
        name: {
            required,
            maxLength: maxLength(20),
            matches
        },
        ticker: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(5),
            matches
        }
    },
    computed: {
        ...mapGetters({
            errors: `currency/${GET_ERRORS}`
        }),
        validationNameClasses() {
            return { 
                'was-validated': this.$v.name.$dirty, 
                'is-invalid': 
                    this.$v.name.$dirty && 
                    (!this.$v.name.required || 
                    !this.$v.name.maxLength ||
                    !this.$v.name.matches),
                'is-valid': 
                    this.$v.name.$dirty && 
                    (this.$v.name.required && 
                    this.$v.name.maxLength &&
                    this.$v.name.matches)

            }
        },
         validationTickerClasses() {
            return { 
                'was-validated': this.$v.ticker.$dirty, 
                'is-invalid': 
                    this.$v.ticker.$dirty && 
                    (!this.$v.ticker.required || 
                    !this.$v.ticker.minLength ||
                    !this.$v.ticker.maxLength||
                    !this.$v.ticker.matches),
                'is-valid': 
                    this.$v.ticker.$dirty &&
                    (this.$v.ticker.required &&
                    this.$v.ticker.minLength &&
                    this.$v.ticker.maxLength &&
                    this.$v.ticker.matches)
            };
        }
    },
    methods: {
        ...mapActions({
            createCurrency: `currency/${CREATE_CURRENCY_API}`
        }),
        async submitHandler() {
            this.$v.$touch();
            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR';
                return;
            }
            try {
                this.submitStatus = 'REQUEST';
                await this.createCurrency({
                    name: this.name,
                    ticker: this.ticker
                })
                if(this.errors) {
                    this.submitStatus = null;
                    return;
                }
                this.$router.push({name: 'currency'});
            }
            catch(error) {
                console.log(error);
            }
        }
    }
}
</script>