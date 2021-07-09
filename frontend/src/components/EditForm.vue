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
                v-if="$v.ticker.$dirty && !$v.ticker.minLength"
            ) No shorter than {{$v.ticker.$params.minLength.min}} characters
    
            .invalid-feedback(
                v-if="$v.ticker.$dirty && !$v.ticker.maxLength"
            ) No longer than {{$v.ticker.$params.maxLength.max}} characters

        button.btn.btn-success.w-100(type="submit") Save
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';
import { 
    UPDATE_CURRENCY_API, 
    GET_ERRORS 
} from '@/store/constants';

export default {
    name: 'edit-form',
    props: {
        currency: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        id: '',
        name: '',
        ticker: '',
        submitStatus: null
    }),
    validations: {
        name: {
            required,
            maxLength: maxLength(20)
        },
        ticker: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(5)
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
                    !this.$v.name.maxLength),
                'is-valid': 
                    this.$v.name.$dirty && 
                    (this.$v.name.required 
                    && this.$v.name.maxLength)

            }
        },
         validationTickerClasses() {
            return { 
                'was-validated': this.$v.ticker.$dirty, 
                'is-invalid': 
                    this.$v.ticker.$dirty && 
                    (!this.$v.ticker.required || 
                    !this.$v.ticker.minLength ||
                    !this.$v.ticker.maxLength),
                'is-valid': 
                    this.$v.ticker.$dirty &&
                    (this.$v.ticker.required &&
                    this.$v.ticker.minLength &&
                    this.$v.ticker.maxLength)
            };
        }
    },
    mounted() {
        this.id = this.$props.currency._id;
        this.name = this.$props.currency.name;
        this.ticker = this.$props.currency.ticker;
    },
    methods: {
        ...mapActions({
            updatetCurrency: `currency/${UPDATE_CURRENCY_API}`,
        }),
        async submitHandler() {
            this.$v.$touch();
            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR';
                return;
            }
            try {
                this.submitStatus = 'REQUEST';
                await this.updatetCurrency({
                    id: this.id,
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
};
</script>