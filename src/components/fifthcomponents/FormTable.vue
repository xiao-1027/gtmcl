<template>
  <div>
    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
      <FormItem label="*旧密码" prop="passwd">
        <Input type="password" v-model="formCustom.passwd"/>
      </FormItem>
      <FormItem label="*新密码" prop="passwdCheck">
        <Input type="password" v-model="formCustom.passwdCheck"/>
      </FormItem>
      <FormItem label="*确认密码" prop="age">
        <Input type="text" v-model="formCustom.age" number/>
      </FormItem>
      <FormItem>
        <slot name="place"></slot>
        <slot name="direction"></slot>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formCustom')">提交</Button>
        <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入您的旧密码'));
      } else {
        if (this.formCustom.passwdCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField('passwdCheck');
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入您的新密码'));
      } else if (value !== this.formCustom.passwd) {
        callback(new Error('The two input passwords do not match!'));
      } else {
        callback();
      }
    };
    const validateAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请再次输入您的新密码'));
      }
      // 模拟异步验证效果
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('Please enter a numeric value'));
        } else {
          if (value < 18) {
            callback(new Error('Must be over 18 years of age'));
          } else {
            callback();
          }
        }
      }, 1000);
    };

    return {
      formCustom: {
        passwd: '',
        passwdCheck: '',
        age: ''
      },
      ruleCustom: {
        passwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        passwdCheck: [
          { validator: validatePassCheck, trigger: 'blur' }
        ],
        age: [
          { validator: validateAge, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    }
  }
}
</script>
<style scoped>
  .ivu-input-wrapper {
    margin-left: 50px;
  }
  .ivu-form-item-label {
    word-break:keep-all;
    /*width: ;*/
  }
  .ivu-form .ivu-form-item-label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 12px;
    color: #515a6e;
    line-height: 1;
    padding: 0px !important;
    box-sizing: border-box;
    white-space: nowrap;
  }
</style>