<template>
  <div class="page-container application-page">
    <section class="page-hero">
      <span class="page-eyebrow">{{ t("application.eyebrow") }}</span>
      <h1>{{ t("application.title") }}</h1>
      <p>{{ t("application.desc") }}</p>
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
            <el-form-item :label="t('application.labels.name')" prop="name">
              <el-input
                v-model="ruleForm.name"
                :placeholder="t('application.placeholders.name')"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12">
            <el-form-item :label="t('application.labels.email')" prop="email">
              <el-input
                v-model="ruleForm.email"
                :placeholder="t('application.placeholders.email')"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="16">
          <el-col :xs="24" :md="12">
            <el-form-item :label="t('application.labels.track')" prop="track">
              <el-select
                v-model="ruleForm.track"
                :placeholder="t('application.placeholders.track')"
                style="width: 100%"
              >
                <el-option
                  v-for="option in trackOptions"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12">
            <el-form-item
              :label="t('application.labels.startDate')"
              prop="startDate"
            >
              <el-date-picker
                v-model="ruleForm.startDate"
                type="date"
                :placeholder="t('application.placeholders.startDate')"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item
          :label="t('application.labels.interests')"
          prop="interests"
        >
          <el-input
            v-model="ruleForm.interests"
            :placeholder="t('application.placeholders.interests')"
          />
        </el-form-item>

        <el-form-item :label="t('application.labels.skills')" prop="skills">
          <el-checkbox-group v-model="ruleForm.skills">
            <el-checkbox
              v-for="option in skillOptions"
              :key="option.value"
              :label="option.value"
            >
              {{ option.label }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item :label="t('application.labels.links')" prop="links">
          <el-input
            v-model="ruleForm.links"
            type="textarea"
            :rows="2"
            :placeholder="t('application.placeholders.links')"
          />
        </el-form-item>

        <el-form-item
          :label="t('application.labels.statement')"
          prop="statement"
        >
          <el-input
            v-model="ruleForm.statement"
            type="textarea"
            :rows="5"
            :placeholder="t('application.placeholders.statement')"
          />
        </el-form-item>

        <div class="actions">
          <el-button type="primary" @click="submitForm('ruleForm')">
            {{ t("application.buttons.submit") }}
          </el-button>
          <el-button @click="resetForm('ruleForm')">
            {{ t("application.buttons.reset") }}
          </el-button>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script>
import { i18nState, translate } from "@/i18n";

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
    };
  },
  computed: {
    lang() {
      return i18nState.lang;
    },
    trackOptions() {
      return [
        { value: "phd", label: this.t("application.tracks.phd") },
        { value: "master", label: this.t("application.tracks.master") },
        { value: "undergrad", label: this.t("application.tracks.undergrad") },
        { value: "intern", label: this.t("application.tracks.intern") },
      ];
    },
    skillOptions() {
      return [
        { value: "ml", label: this.t("application.skills.ml") },
        { value: "nlp", label: this.t("application.skills.nlp") },
        { value: "speech", label: this.t("application.skills.speech") },
        { value: "systems", label: this.t("application.skills.systems") },
      ];
    },
    rules() {
      return {
        name: [
          {
            required: true,
            message: this.t("application.rules.nameRequired"),
            trigger: "blur",
          },
          {
            min: 2,
            max: 32,
            message: this.t("application.rules.nameLength"),
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: this.t("application.rules.emailRequired"),
            trigger: "blur",
          },
          {
            type: "email",
            message: this.t("application.rules.emailInvalid"),
            trigger: ["blur", "change"],
          },
        ],
        track: [
          {
            required: true,
            message: this.t("application.rules.trackRequired"),
            trigger: "change",
          },
        ],
        startDate: [
          {
            type: "date",
            required: true,
            message: this.t("application.rules.startDateRequired"),
            trigger: "change",
          },
        ],
        interests: [
          {
            required: true,
            message: this.t("application.rules.interestsRequired"),
            trigger: "blur",
          },
          {
            min: 6,
            message: this.t("application.rules.interestsLength"),
            trigger: "blur",
          },
        ],
        skills: [
          {
            type: "array",
            required: true,
            message: this.t("application.rules.skillsRequired"),
            trigger: "change",
          },
        ],
        statement: [
          {
            required: true,
            message: this.t("application.rules.statementRequired"),
            trigger: "blur",
          },
          {
            min: 40,
            message: this.t("application.rules.statementLength"),
            trigger: "blur",
          },
        ],
      };
    },
  },
  methods: {
    t(path) {
      return translate(this.lang, path);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false;
        }
        this.$message.success(this.t("application.messages.submitSuccess"));
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
