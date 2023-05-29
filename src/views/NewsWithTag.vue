<template>
    <div class="news">
        <br><h1>Latest news with the tag: {{ tag }}</h1><br>

        <div class="newsInfoDiv" v-for="news in newsList" :key="news.id" @click="goToNews(news.id)">
            <h3><b>{{ news.title }}</b></h3>
            <p> ( {{ news.categoryName }} )</p>
            <!-- <h5>{{ news.author }}</h5> -->
            <p>{{ news.createdAt }}</p>
            <p>{{ news.content | shortText }}</p>
        </div>

    </div>
</template>
<script>
export default ({
    data() {
        return {
            newsList: [],
            newsCategoryList: [],
            tag: ''
        }
    },
    mounted() {
        let id = this.$route.params.id;
        this.$axios.get('/api/news/tag/'+id).then((response) => {
            this.newsList = response.data;
            this.tag = this.newsList[0].searchedTag;
            console.log(this.newsList);
        })
    },
    filters: {
        shortText(value) {
            if (value.length <= 317) {
                return value;
            } else {
                return value.slice(0, 317) + '...';
            }
        }
    },
    methods: {
        goToNews(id){
            console.log('KLIKNUTO NA ' + id);
            this.$router.push('/news/'+id);
        }
    }
})
</script>
<style scoped>
.news {
    text-align: center;
}

.table {
    width: 80%;
    height: auto;
}

.newsInfoDiv {
    margin-top: 8px;
    margin-bottom: 12px;
    border: 2px solid black;
    width: 100%;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 12px;
    margin-bottom: 8px;
    cursor: pointer;
}
</style>