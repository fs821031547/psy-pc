<template>
    <Steps :current="current">
        <Step title="同意入驻协议" content=""></Step>
        <Step title="个人信息" content=""></Step>
        <Step title="专业资质" content=""></Step>
        <Step title="咨询服务设置" content=""></Step>
    </Steps>
</template>
<script>
    export default {
        props:{
            current:{
                type: Number,
                default: 1
            }
        }
    }
</script>