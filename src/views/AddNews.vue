<template>
    <b-container>
        <br>
        <h4>Add news</h4>
        <b-form @submit.stop.prevent @submit="onSubmit">
            <b-form-group label="Title" label-for="title">
                <b-form-input :state="validatorTitle" id="title" v-model="form.title" type="text" placeholder="Title"
                    required></b-form-input>
                <b-form-invalid-feedback :state="validatorTitle">
                    Title cannot be empty.
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Category" label-for="category">
                <b-form-select :state="validatorCategory" v-model="selected" :options="options"
                    id="category"></b-form-select>
            </b-form-group>
            <b-form-group label="Content" label-for="content">
                <!-- <b-form-input :state="validatorContent" id="content" v-model="form.content" type="text"
                    placeholder="Content" required></b-form-input> -->
                <b-form-textarea :state="validatorContent" id="content" v-model="form.content" placeholder="Content"
                    rows="3" max-rows="16"></b-form-textarea>
                <b-form-invalid-feedback :state="validatorContent">
                    Content cannot be empty.
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group>
                <label for="tags-basic">Tags</label>
                <b-form-tags :state="validatorTags" input-id="tags-basic" v-model="value"></b-form-tags>
            </b-form-group>
            <b-form-valid-feedback :state="validatorContent && validatorTitle && validatorCategory && validatorTags">
            </b-form-valid-feedback>
            <br>
            <b-button type="submit" variant="success">Add News</b-button>
        </b-form>
    </b-container>
</template>
<script>
export default {
    data() {
        return {
            form: {
                title: '',
                content: ''
            },
            selected: null,
            options: [],
            value: [],
            nID: null,
            toAddTags: []
        }
    },
    computed: {
        validatorContent() {
            return this.form.content.length >= 1 && this.form.content.length <= 8192;
        },
        validatorTitle() {
            return this.form.title.length >= 1 && this.form.title.length <= 128;
        },
        validatorCategory() {
            return this.selected != null;
        },
        validatorTags() {
            return this.value.length != 0;
        }
    },
    mounted() {
        this.$axios.get('/api/categories').then((response => {
            const categories = response.data;
            this.options.push(new Object({
                value: null,
                text: 'Select a category'
            }));
            for (const ctg of categories) {
                this.options.push(new Object({
                    value: ctg.id,
                    text: ctg.name
                }));
            }
        }));
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();
            let boolean = false;
            if (this.validatorContent && this.validatorCategory && this.validatorTags && this.validatorTitle) {
                //provera da li uneti tagovi vec postoje, ako postoje dodaje se samo veza u NewsTag tabelu
                //ukoliko ne postoje dodaju se u Tag tabelu i potom u NewsTag tabeli se pravi veza
                //veza u NewsTag tabeli se mora desiti nakon post-a za vest zbog foreign-key constraint-a
                let added = []; //cuva id-eve tagova za povezivanje
                let toBeAdded = []; //cuva id tagova za ubacivanje u tabelu i povezivanje kasnije

                boolean = true;
                let token = localStorage.getItem('token');
                let payload = token.split(".")[1];
                let u = JSON.parse(atob(payload));
                let author = JSON.stringify(u.name).replaceAll('\"', "");
                this.$axios.post('/api/news', {
                    title: this.form.title,
                    author: author,
                    content: this.form.content,
                    views: 0,
                    category_id: this.selected
                }).then((response => {
                    const news = response.data;
                    this.nID = news.id;
                    for (const tag of this.value) {
                        this.$axios.get('/api/tags/find/' + tag).then((response3 => {
                            const r = response3.data;
                            if (r.id != null) {
                                added.push(r.id);
                                this.$axios.get('/api/newstag/add/' + this.nID + '/' + r.id);
                            } else {
                                toBeAdded.push(tag);
                                this.$axios.post('/api/tags', {
                                    tag: tag
                                }).then((r2 => {
                                    const t = r2.data;
                                    this.$axios.get('/api/newstag/add/' + this.nID + '/' + t.id);
                                }));
                            }
                        }));
                    }
                })).then(r => {
                    this.$router.push({name: 'CreatorNews'});
                });


            } else {
                console.log(this.selected);
                alert("All fields are required!");
                return;
            }
        }
    }
}
</script>
<style scoped></style>