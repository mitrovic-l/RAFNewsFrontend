<template>
    <div class="users">
        <br>
        <h1>All users</h1><br>
        <ul id="itemList">
            <li v-for="user in itemsForList" :key="user.id">
                <div class="userInfoDiv">
                    <!-- ubaci tabelu ovde -->
                    <br>
                    <b><h4>USER: {{ user.firstname }} {{ user.lastname }}</h4></b>
                    <hr>
                    <div class="userInfoDiv" style="text-align: justify;">
                        <b>
                        <p>ID: {{ user.id }}</p>
                        <p :id="user.id">STATUS: {{ user.status }}</p>
                        <p>USER TYPE: {{ user.type }}</p>
                        </b>
                    </div>

                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button v-if="isCreator(user.type)" type="button" class="btn btn-outline-primary" @click="changeStatus(user.id, user.status)">Change status</button>
                        <button type="button" class="btn btn-secondary" @click="">Edit</button>
                        <button type="button" class="btn btn-danger" @click="">Delete</button>
                    </div>
                </div>
            </li>
        </ul>

        <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="itemList">
        </b-pagination>

    </div>
</template>
<script>
export default {
    data() {
        return {
            userList: [],
            currentPage: 1,
            perPage: 2,
            items: [],
            get itemsForList() {
                return this.items.slice(
                    (this.currentPage - 1) * this.perPage,
                    this.currentPage * this.perPage,
                );
            }
            // rows : this.newsList.length,
        }
    },
    computed: {
        rows() {
            return this.userList.length;
        }
    },
    mounted() {
        this.$axios.get('/api/users').then((response => {
            this.userList = response.data;
            let i = 0;
            for (const user of this.userList) {
                console.log(i);
                let u = {};
                u.id = user.id;
                u.firstname = user.first_name;
                u.lastname = user.last_name;
                if (user.status == 0) {
                    u.status = "Not Active";
                } else {
                    u.status = "Active";
                }
                if (user.type == 0) {
                    u.type = "Content Creator";
                } else {
                    u.type = "Admin";
                }
                this.items.push(u);
                u = {};
                i++;
            }
            console.log("ITEMS: " + this.items);
        }))

    },
    methods: {
        isCreator(type){
            if (type != "Admin"){
                return true;
            }
        },
        changeStatus(id, status){
            let newstatus = '';
            if (status == 'Active'){
                newstatus = 'Not Active';
            } else {
                status = 'Active';
            }
            let email = '';
            for (const u of this.userList){
                if (id == u.id){
                    email = u.email;
                }
            }
            if (email != ''){
                this.$axios.get('/api/users/status/'+email).then((response => {
                    const p = document.getElementById(id);
                    p.innerText = '';
                    p.innerText = 'STATUS: ' + newstatus;
                    this.$forceUpdate();
                }));
            }
        }
    }
}

</script>
<style scoped>
.userInfoDiv {
    margin-top: 8px;
    margin-bottom: 12px;
    border: 2px solid black;
    width: 100%;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 12px;
    margin-bottom: 8px;
}

.users {
    text-align: center;
}

ul {
    list-style-type: none;
}


.btn {
    margin: 12px;
}
</style>