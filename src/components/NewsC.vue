<template>
    <div class="singlenews">
        <h1>{{ news.title }}</h1>
        <p class="pdate">Objavljeno: {{ news.createdAt }}</p>
        <p class="pauthor">{{ news.author }}</p>
        <p>{{ news.categoryName }}</p>
        <p>{{ news.content }}</p>

        <p>Tags: </p>
        <p v-for="tag in news.tags" :key="tag.tag">
            {{ tag.tag }}
        </p>
        <br>
        <br>
        <!-- forma ide ovde -->
        <div class="commentform">
            <b-container>
        <br>
        <h5>Leave a comment</h5>
        <b-form @submit.stop.prevent @submit="onSubmit">
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
    </b-container>
        </div>
        <h3>Comments</h3>
        <div class="divcomments" v-for="comment in news.comments" :key="comment.author+news.id">
            <h5>{{ comment.author }}</h5>
            <p>{{ comment.text }}
            <br>
            <small class="pdate">{{ comment.postedAt }}</small>
            </p>
            
        </div>
    </div>
</template>
<script>

export default{
    name: 'NewsC',
    props: {
        news: {
            type: Object
        }
    },
    data(){
        return{
            form: {
                username: '',
                comment: ''
            }
        }
    },
    mounted(){
    },
    methods: {
        onSubmit(e){
            e.preventDefault();
            let id = this.$route.params.id;
            if (!this.validatorComment || !this.validatorUsername){
                alert("You must enter a name and a comment.")
                return;
            }
            this.$axios.post('/api/comments/'+id, {
                author: this.form.username,
                text: this.form.comment
            }).then((response => {
                this.form.username = '';
                this.form.comment = '';
                const comm = response.data;
                this.news.comments.unshift(comm);
                this.$forceUpdate();
            }))
        }
    },
    computed: {
        validatorUsername(){
            return this.form.username.length >= 1 && this.form.username.length <= 128;
        },
        validatorComment(){
            return this.form.comment.length >= 1 && this.form.comment.length <= 1024;
        },
        isUEmpty(){
            return this.form.username.length === 0;
        },
        isCEmpty(){
            return this.form.comment.length === 0;
        },
        isGood(){
            return !(this.validatorComment && this.validatorUsername);
        }
    }
}
</script>
<style>
.pdate{
    margin-top: 0px;
    padding-top: 0px;
    color: gray;
}
.pauthor{
    font-weight: 600;
}
.divcomments{
    margin-top: 8px;
    margin-bottom: 8px;
    border: 1px solid gray;
    width: 100%;
    /* padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 12px; */
    margin-bottom: 8px;
    cursor: pointer;
}
.singlenews{
    padding-top: 24px;
}
.commentform{
    padding-bottom: 12px;
}
</style>