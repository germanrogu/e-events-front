<template>
  <Layout>
    <h1>{{ $page.event.title }}</h1>
    <img :src="`http://localhost:1337${$page.event.image}`" />
    <p>{{$page.event.description}}</p>
  </Layout>
</template>

<page-query>

query{
  event(id:"2"){
	id
    title
    duration
    price
    date
    image
    description
  }
}

</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.event.title,
    };
  },
};
</script>

<style>
</style>