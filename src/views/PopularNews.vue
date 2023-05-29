<template>
    <div class="news">
        <br><h1>Most popular news</h1><br>

        <div class="newsInfoDiv" v-for="news in newsList" :key="news.id" @click="goToNews(news.id)">
            <h3><b>{{ news.title }}</b></h3>
            <p> ( {{ news.categoryName }} )</p>
            <h5>{{ news.author }}</h5>
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
            newsCategoryList: []
        }
    },
    mounted() {
        this.$axios.get('/api/news/byViews').then((response) => {
            this.newsList = response.data;
            for (const n of this.newsList){
                this.$axios.get('/api/categories/').then((response2) => {
                    const categories = response2.data;
                    //console.log(response2.data);
                    for (const category of categories){
                        if (category.id === n.category_id){
                            n.category = category.name;
                            this.newsCategoryList[n.id] = category.name.toString();
                        }
                    }
                })
            }
            //console.log(response);
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