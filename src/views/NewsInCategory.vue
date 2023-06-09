<template>
    <div class="news">
        <br><h1>Latest news from <b>{{ category }}</b> </h1><br>

        <!-- <div class="newsInfoDiv" v-for="news in newsList" :key="news.id" @click="goToNews(news.id)">
            <h3><b>{{ news.title }}</b></h3>
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
            category: '',
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
        this.$axios.get('/api/news/category/'+id).then((response) => {
            this.newsList = response.data;
            //this.category = this.newsList[0].categoryName;
            this.$axios.get('/api/categories/find/'+id).then((response => {
                let c = response.data;
                this.category = c.name;
            }));
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
    border: 2px solid black;
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