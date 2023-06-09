<template>
    <div class="singlenews">
        <h1>{{ news.title }}</h1>
        <p class="pdate">Objavljeno: {{ news.createdAt | dateFilter }}</p>
        <p class="pauthor">Autor: {{ news.author }}</p>
        <p><u>Kategorija: {{ news.categoryName }}</u></p>
        <p>{{ news.content }}</p>

       <br>
       <h5>Tags:</h5>
        <button v-for="tag in news.tags" :key="tag.id" class="btn btn-outline-info tagsBtn" @click="goToTag(tag.id)">
            {{ tag.tag }}
        </button>
        <br>
        <br>
                <hr>
                <h4>Leave a comment</h4>
                <b-form @submit.stop.prevent @submit="onSubmit" class="commentsform">
                    <b-form-group label="Name" label-for="username">
                        <b-form-input :state="validatorUsername" id="username" v-model="form.username" type="text"
                            placeholder="Name" required></b-form-input>
                        <b-form-invalid-feedback :state="validatorUsername">
                            Name cannot be empty.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Comment:" label-for="comment">
                        <b-form-textarea :state="validatorComment" id="comment" v-model="form.comment" type="text"
                            placeholder="Comment" required></b-form-textarea>
                        <b-form-invalid-feedback :state="validatorComment">
                            Comment cannot be empty.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-valid-feedback :state="validatorUsername && validatorComment">
                        Looks good!
                    </b-form-valid-feedback>
                    <b-button type="submit" variant="success" id="combtn" :disabled="isGood">Post comment</b-button>
                </b-form>
        <h3>Comments</h3>
        <div class="divcomments" v-for="comment in news.comments" :key="comment.author + news.id">
            <h5 class="comm"><b>{{ comment.author }}</b></h5>
            <p class="commtext comm">{{ comment.text }}
            </p>
            <small class="pdate comm">Postavljeno: {{ comment.postedAt | dateFilter}}</small>

        </div>
    </div>
</template>
<script>

export default {
    name: 'NewsC',
    props: {
        news: {
            type: Object
        }
    },
    data() {
        return {
            form: {
                username: '',
                comment: ''
            }
        }
    },
    mounted() {
    },
    filters: {
        dateFilter(value){
            let a = value.split('-');

            return a[2]+'.'+a[1]+'.'+a[0]+'.';
        }
    },

    methods: {
        onSubmit(e) {
            e.preventDefault();
            let id = this.$route.params.id;
            if (!this.validatorComment || !this.validatorUsername) {
                alert("You must enter a name and a comment.")
                return;
            }
            this.$axios.post('/api/comments/' + id, {
                author: this.form.username,
                text: this.form.comment
            }).then((response => {
                this.form.username = '';
                this.form.comment = '';
                const comm = response.data;
                this.news.comments.unshift(comm);
                this.$forceUpdate();
            }))
        },
        goToTag(tag){
            console.log(tag);
            this.$router.push('/news/withtag/'+tag);
        }
    },
    computed: {
        validatorUsername() {
            return this.form.username.length >= 1 && this.form.username.length <= 128;
        },
        validatorComment() {
            return this.form.comment.length >= 1 && this.form.comment.length <= 1024;
        },
        isUEmpty() {
            return this.form.username.length === 0;
        },
        isCEmpty() {
            return this.form.comment.length === 0;
        },
        isGood() {
            return !(this.validatorComment && this.validatorUsername);
        }
    }
}
</script>
<style>
.pdate {
    margin-bottom: 0;
    padding-bottom: 0;
    color: gray;
    margin-top: 0;
}

.pauthor {
    font-weight: 600;
    margin-bottom: 2px;
}
.commtext{
    margin-bottom: 0px;
}
.comm{
    margin-left: 12px;
}

.divcomments {
    margin-top: 8px;
    margin-bottom: 12px;
    border: 1px solid gray;
    width: 100%;
    padding-bottom: 24px;
    cursor: pointer;
}
.commentsform{
    padding-bottom: 32px;
}

.singlenews {
    padding-top: 24px;
}

.tagsBtn{
    margin-right: 8px;
}
</style>