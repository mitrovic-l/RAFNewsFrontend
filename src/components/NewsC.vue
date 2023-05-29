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
        <h3>Comments</h3>
        <!-- forma ide ovde -->
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
        }
    },
    mounted(){
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
</style>