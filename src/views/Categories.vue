<template>
    <div class="news">
        <br>
        <h1>All categories</h1><br>
        <button type="button" class="btn btn-primary" @click="addCategory"> Add a new category </button>
        <ul id="itemList">
            <li v-for="category in itemsForList" :key="category.id">
                <div class="newsInfoDiv">
                    <h3 @click="goToCategory(category.id)"><b>{{ category.name }}</b></h3>
                    <p>{{ category.description | shortText }}</p>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-secondary" @click="editCategory(category.id)">Edit</button>
                        <button type="button" class="btn btn-danger" @click="deleteCategory(category.id)">Delete</button>
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
            categoryList: [],
            currentPage: 1,
            perPage: 2,
            // rows : this.newsList.length,
            get itemsForList() {
                return this.categoryList.slice(
                    (this.currentPage - 1) * this.perPage,
                    this.currentPage * this.perPage,
                );
            }
        }
    },
    mounted() {
        this.$axios.get('/api/categories').then((response) => {
            this.categoryList = response.data;
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
        goToCategory(id) {
            console.log('KLIKNUTO NA ' + id);
            this.$router.push('/category/' + id);
        },
        deleteCategory(id) {
            let news = [];
            this.$axios.get('/api/news/category/' + id).then((response => {
                console.log(response.data);
                news = response.data;
                if (news.length === 0) {
                    this.$axios.delete('/api/categories/delete/' + id).then((response => {
                        window.location.reload();
                    }));
                    console.log("DELETING");
                } else {
                    alert("Some news belong in this category, cannot delete!");
                    return;
                }
            }));


        },
        editCategory(id) {
            ///categories/edit/:id
            this.$router.push('/categories/edit/' + id);
        },
        addCategory(){
            this.$router.push({name: 'AddCategory'});
        }
    },
    computed: {
        rows() {
            return this.categoryList.length;
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

h3 {
    cursor: pointer;
}

.btn {
    margin: 12px;
}
</style>