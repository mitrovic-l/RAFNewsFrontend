<template>
    <div class="news">
        <br><h1>Latest news with the tag: {{ tag }}</h1><br>

        <!-- <div class="newsInfoDiv" v-for="news in newsList" :key="news.id" @click="goToNews(news.id)">
            <h3><b>{{ news.title }}</b></h3>
            <p> ( {{ news.categoryName }} )</p>
            <p>{{ news.createdAt }}</p>
            <p>{{ news.content | shortText }}</p>
        </div> -->
        <ul id="itemList">
            <li v-for="news in itemsForList" :key="news.id">
                <div class="newsInfoDiv" @click="goToNews(news.id)">
                    <h3><b>{{ news.title }}</b></h3>
                    <p> ( {{ news.categoryName }} )</p>
                    <p>{{ news.createdAt | dateFilter}}</p>
                    <p>{{ news.content | shortText }}</p>
                </div>
            </li>
        </ul>
        <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="itemList" align="center">
        </b-pagination>

    </div>
</template>
<script>
export default ({
    data() {
        return {
            newsList: [],
            newsCategoryList: [],
            tag: '',
            perPage: 2,
            currentPage: 1,
            get itemsForList() {
                return this.newsList.slice(
                    (this.currentPage - 1) * this.perPage,
                    this.currentPage * this.perPage,
                );
            }
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
        },
        dateFilter(value){
            let a = value.split('-');

            return a[2]+'.'+a[1]+'.'+a[0]+'.';
        }
    },
    methods: {
        goToNews(id){
            console.log('KLIKNUTO NA ' + id);
            this.$router.push('/news/'+id);
        }
    },
    computed: {
        rows() {
            return this.newsList.length;
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
    border: 2px solid #292b2c ;
    width: 100%;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 12px;
    margin-bottom: 8px;
    cursor: pointer;
}
.newsInfoDiv:hover{
    margin-top: 8px;
    margin-bottom: 12px;
    border: 2px solid #0275d8 ;
    width: 100%;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 12px;
    margin-bottom: 8px;
    cursor: pointer;
}
ul{
    list-style-type: none;
}
</style>