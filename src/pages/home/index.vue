<template>
    <h1 class="title">Good</h1>
    <div class="d-flex j-center">
        <Button value="Logout" is-red @click="logout" />
    </div>

    <h3 class="title">From</h3>
    <div class="d-flex j-center">
        <Input v-model="api.item.name" placeholder="Name" />
        <Input v-model="api.item.age" placeholder="Age" type="number" />
        <Input v-model="api.item.id" placeholder="id" type="number" />
    </div>

    <h3 class="title">Crud</h3>
    <div class="d-flex j-center">
        <Button value="Post" is-blue @click="api.create({}, 'Nise')" />
        <Button value="Read" is-blue @click="api.read()" />
        <Button value="update" is-gray @click="api.update()" />
        <Button value="Delete" is-red @click="api.remove()" />
    </div>

    <h3 class="title">Filter input</h3>
    <div class="d-flex j-center">
        <Input v-model="api.filter.name" placeholder="Name" />
    </div>

    <h3 class="title">Filter</h3>
    <div class="d-flex j-center">
        <Button value="Filter Full" @click="api.filter = { name: 'Akhmed', age: 24 }" />
        <Button value="Filter to Name" @click="api.filter = { name: 'Akhmed' }" />
        <Button value="Filter Clear" @click="api.filter = {}" />
    </div>

    <h3 class="title">Fetch</h3>
    <pre class="pre">{{ api.isLoading ? 'Loading...' : api.data }}</pre>
</template>

<script setup lang="ts">
import { Button, Input } from '@ui/index'
import { logout } from '@/entities/authorization'

const api = ref(useService('/users'))
</script>

<style scoped lang="scss">
.title {
    margin: 35px 0 20px;
    border-top: 1px solid #fff;
    padding-top: 20px;
}
.pre {
    text-align: left;
}
</style>
