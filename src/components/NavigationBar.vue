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
                    <li class="nav-item ccli" v-if="canLogout">
                        <b-dropdown text="Content-Creator" variant="primary" class="e-auto mb-2 mb-lg-0 ctgdrop">
                            <b-dropdown-item @click="goToCategories">
                                Categories
                            </b-dropdown-item>
                            <b-dropdown-item @click="goToCreatorNews">
                                News
                            </b-dropdown-item>
                        </b-dropdown>
                    </li>
                    <li class="nav-item ccli" v-if="canLogout && adminCheck">
                        <b-dropdown text="Admin" variant="success" class="e-auto mb-2 mb-lg-0 ctgdrop">
                            <b-dropdown-item @click="goToUsers()">
                                Users
                            </b-dropdown-item>
                        </b-dropdown>
                    </li>
                </ul>
                <ul class="navbar-nav ms-auto" v-if="canLogout">
                    <li class="nav-item">
                        <!-- <router-link :to="{name: 'Login'}" tag="a" class="nav-link disabled" disabled> Hello, {{ user }}</router-link> -->
                        <p class="customlink">Hello, {{ user }}</p>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-1">
                    <router-link v-if="!canLogout" :to="{name: 'Login'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'Login'}">Log In</router-link>
                    <div v-else>
                        <button class="btn btn-outline-danger" @click="logOut">Log Out</button>
                    </div>
                </form>
            </div>
        </nav>
    </div>
</template>
<script>
import router from '@/router';

export default {
    name: "Navigation_Bar",
    props: {
        jwttoken: ""
    },
    watch: {
        jwttoken(newVal, oldVal) {
            console.log("NAVBAR ISPIS, PROMENJEN TOKEN!!!!!");
            this.token = newVal;
            if (this.token != null) {
                let payload = this.token.split(".")[1];
                let u = JSON.parse(atob(payload));
                let username = JSON.stringify(u.name);
                this.admin = JSON.stringify(u.type);
                console.log("KORISNIK: " + JSON.stringify(u.type) + " Admin: " + this.admin);
                this.user = username.replaceAll("\"", "");
            }
            this.$forceUpdate();
        }
    },
    async created() {
        this.isJwtSet = localStorage.getItem("token");
    },
    data() {
        return {
            selectedCategory: null,
            categoryList: [],
            token: "",
            isJwtSet: null,
            user: "",
            admin: 0
        };
    },
    mounted() {
        let a = localStorage.getItem("token");
        console.log("TOKEN: " + a);
        fetch("http://127.0.0.1:8090/api/categories")
            .then(response => {
            return response.json();
        }).then(ctgs => {
            console.log(JSON.stringify(ctgs));
            this.categoryList = ctgs;
        });
    },
    methods: {
        logOut() {
            localStorage.removeItem("token");
            this.token = null;
            this.$forceUpdate();
            this.$router.push({ name: "Login" });
        },
        findInCategory(id) {
            this.$router.push("/category/" + id).then(() => {
                this.$forceUpdate();
            });
        },
        getUser() {
            return username.replaceAll("\"", "");
        },
        goToUsers(){
            console.log("users");
            this.$router.push({name: "Users"});
        },
        goToCategories(){
            this.$router.push({name: 'Categories'});
        },
        goToCreatorNews(){
            this.$router.push({name: 'CreatorNews'});
        }
    },
    computed: {
        canLogout() {
            if (this.token == "") {
                return false;
            }
            return true;
        },
        adminCheck(){
            if (this.admin == 1){
                return true;
            }
            return false;
        }

    },
    components: { router }
}
</script>
<style scoped>
.ctgdrop{
    margin-top: 3px;
    height: 35px;
}
.customlink{
    color: #198754;
    margin-top: 14px;
    margin-right: 12px;
}
.ccli{
    padding-left: 8px;
}

</style>