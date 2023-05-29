<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">RAF News</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        
                            <router-link :to="{ name: 'News' }" tag="a" class="nav-link"
                            :class="{ active: this.$router.currentRoute.name === 'News' }">News</router-link>
                        
                    </li>
                    <li class="nav-item">
                        
                            <router-link :to="{ name: 'PopularNews' }" tag="a" class="nav-link"
                            :class="{ active: this.$router.currentRoute.name === 'PopularNews' }">Most Popular News</router-link>
                        
                    </li>
                    <li class="nav-item">
                        <b-dropdown text="Categories" variant="secondary" class="e-auto mb-2 mb-lg-0 ctgdrop">
                            <b-dropdown-item href="#" v-for="category in categoryList" :key="category.name" @click="findInCategory(category.id)">{{ category.name
                            }}</b-dropdown-item>
                        </b-dropdown>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <router-link v-if="!isJwtSet" :to="{name: 'Login'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'Login'}">Log In</router-link>
                    <div v-else>
                        <button class="btn btn-outline-success" @click="logOut">Log Out</button>
                    </div>
                </form>
            </div>
        </nav>
    </div>
</template>
<script>
export default {
    name: 'Navigation_Bar',
    computed: {
        
    },
   async created(){
    this.isJwtSet = localStorage.getItem('token');
    },
    data() {
        return {
            selectedCategory: null,
            categoryList: [],
            token: null,
            isJwtSet: null
        }
    },
    mounted() {
        //isJwtSet();

        fetch('http://127.0.0.1:8090/api/categories')
            .then(response => {
                return response.json();
            }).then(ctgs => {
                console.log(JSON.stringify(ctgs));
                this.categoryList = ctgs;
            })
    },
    methods: {
        logOut(){
            localStorage.removeItem('token');
            this.token = null;
            this.$forceUpdate();
            this.$router.push({name: 'Login'});

        },
        findInCategory(id){
            this.$router.push('/category/'+id).then(() => {
                this.$forceUpdate();
            });
        }
    }
}
</script>
<style scoped>
.ctgdrop{
    margin-top: 3px;
    height: 35px;
}
</style>