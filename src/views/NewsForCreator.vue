<template>
    <div class="news">
        <br>
        <h1>NEWS</h1>
        <button type="button" class="btn btn-primary" @click="addNews"> Add news </button>
        <hr>
        <ul id="itemList">
            <li v-for="news in itemsForList" :key="news.id">
                <div class="newsInfoDiv">
                    <h3 @click="goToNews(news.id)"><b>{{ news.title }}</b></h3>
                    <p> ( {{ news.categoryName }} )</p>
                    <p>{{ news.createdAt }}</p>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-secondary" @click="editNews(news.id)">Edit</button>
                        <button type="button" class="btn btn-danger" @click="deleteNews(news.id)">Delete</button>
                    </div>
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
            currentPage: 1,
            perPage: 2,
            // rows : this.newsList.length,
            get itemsForList() {
                return this.newsList.slice(
                    (this.currentPage - 1) * this.perPage,
                    this.currentPage * this.perPage,
                );
            }
        }
    },
    mounted() {
        this.$axios.get('/api/news/allNews').then((response) => {
            this.newsList = response.data;
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
        goToNews(id) {
            console.log('KLIKNUTO NA ' + id);
            let route = this.$router.resolve('/news/' + id);
            window.open(route.href, '_blank');
        },
        deleteNews(id){
            //delete
            this.$axios.delete('/api/news/delete/'+id).then((response => {
                window.location.reload();
            }));
        },
        addNews(){
            this.$router.push({name: 'AddNews'});
        },
        editNews(id){
            this.$router.push('/editnews/'+id);
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
}

ul {
    list-style-type: none;
}
h3{
    cursor: pointer;
}
.btn{
    margin: 12px;
}
</style>