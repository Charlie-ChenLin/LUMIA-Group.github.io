<template>
  <div class="page-container application-page">
    <section class="page-hero">
      <span class="page-eyebrow">Join Us</span>
      <h1>Application</h1>
      <p>
        Tell us about your interests and background. We review applications for
        PhD, Master, undergraduate, and internship tracks.
      </p>
    </section>

    <section class="form-shell glass-card">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-position="top"
        class="apply-form"
      >
        <el-row :gutter="16">
          <el-col :xs="24" :md="12">
            <el-form-item label="Name" prop="name">
              <el-input v-model="ruleForm.name" placeholder="Your full name" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12">
            <el-form-item label="Email" prop="email">
              <el-input
                v-model="ruleForm.email"
                placeholder="name@example.com"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="16">
          <el-col :xs="24" :md="12">
            <el-form-item label="Track" prop="track">
              <el-select
                v-model="ruleForm.track"
                placeholder="Select a track"
                style="width: 100%"
              >
                <el-option label="PhD" value="phd" />
                <el-option label="Master" value="master" />
                <el-option label="Undergraduate" value="undergrad" />
                <el-option label="Internship" value="intern" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12">
            <el-form-item label="Available Start Date" prop="startDate">
              <el-date-picker
                v-model="ruleForm.startDate"
                type="date"
                placeholder="Select a date"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="Research Interests" prop="interests">
          <el-input
            v-model="ruleForm.interests"
            placeholder="e.g. LLMs, reasoning, multimodal modeling"
          />
        </el-form-item>

        <el-form-item label="Skills" prop="skills">
          <el-checkbox-group v-model="ruleForm.skills">
            <el-checkbox label="Machine Learning" />
            <el-checkbox label="Natural Language Processing" />
            <el-checkbox label="Speech / Multimodal" />
            <el-checkbox label="Distributed Systems" />
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="Portfolio / Homepage" prop="links">
          <el-input
            v-model="ruleForm.links"
            type="textarea"
            :rows="2"
            placeholder="Add links to your homepage, Google Scholar, GitHub, or selected papers"
          />
        </el-form-item>

        <el-form-item label="Statement" prop="statement">
          <el-input
            v-model="ruleForm.statement"
            type="textarea"
            :rows="5"
            placeholder="Briefly describe why you want to join LUMIA and what you want to build."
          />
        </el-form-item>

        <div class="actions">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >Submit</el-button
          >
          <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  name: "ApplicationPage",
  data() {
    return {
      ruleForm: {
        name: "",
        email: "",
        track: "",
        startDate: "",
        interests: "",
        skills: [],
        links: "",
        statement: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input your name",
            trigger: "blur",
          },
          {
            min: 2,
            max: 32,
            message: "Length should be 2 to 32 characters",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "Please input your email",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Please input a valid email",
            trigger: ["blur", "change"],
          },
        ],
        track: [
          {
            required: true,
            message: "Please select a track",
            trigger: "change",
          },
        ],
        startDate: [
          {
            type: "date",
            required: true,
            message: "Please select a date",
            trigger: "change",
          },
        ],
        interests: [
          {
            required: true,
            message: "Please describe your interests",
            trigger: "blur",
          },
          { min: 6, message: "Please provide more details", trigger: "blur" },
        ],
        skills: [
          {
            type: "array",
            required: true,
            message: "Please select at least one skill tag",
            trigger: "change",
          },
        ],
        statement: [
          {
            required: true,
            message: "Please provide a statement",
            trigger: "blur",
          },
          {
            min: 40,
            message: "Please write at least 40 characters",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false;
        }
        this.$message.success(
          "Application submitted. Please follow up by email if needed."
        );
        return true;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.form-shell {
  padding: 26px;
}

.actions {
  display: flex;
  gap: 10px;
}
</style>

<style lang="less">
.application-page {
  .el-form-item__label {
    color: var(--text-primary);
    font-weight: 600;
    padding-bottom: 6px;
  }

  .el-input__inner,
  .el-textarea__inner {
    border-radius: 12px;
    border-color: rgba(0, 0, 0, 0.1);
  }

  .el-input__inner:focus,
  .el-textarea__inner:focus {
    border-color: #0a84ff;
  }

  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    border-color: #0a84ff;
    background-color: #0a84ff;
  }

  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: var(--text-primary);
  }

  .el-button--primary {
    background: linear-gradient(135deg, #0a84ff, #0071e3);
    border-color: #0071e3;
  }

  .el-button--primary:hover,
  .el-button--primary:focus {
    background: #0077ed;
    border-color: #0077ed;
  }
}
</style>
