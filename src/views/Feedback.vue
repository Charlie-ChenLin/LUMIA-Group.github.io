<template>
  <div class="page-container feedback-page">
    <section class="page-hero">
      <span class="page-eyebrow">{{ t("feedback.eyebrow") }}</span>
      <h1>{{ t("feedback.title") }}</h1>
      <p>{{ t("feedback.desc") }}</p>
      <button class="open-dialog-btn" @click="dialogVisible = true">
        {{ t("feedback.openButton") }}
      </button>
    </section>

    <section class="glass-card info-card">
      <p class="info-title">{{ t("feedback.infoTitle") }}</p>
      <p class="info-text">{{ t("feedback.infoText") }}</p>
      <p v-if="lastSavedAt" class="saved-tip">
        {{ t("feedback.lastSaved") }} {{ lastSavedAt }}
      </p>
    </section>

    <el-dialog
      :visible.sync="dialogVisible"
      :title="t('feedback.dialogTitle')"
      width="min(92vw, 640px)"
      @closed="onDialogClosed"
    >
      <el-form
        ref="feedbackForm"
        :model="feedbackForm"
        :rules="rules"
        label-position="top"
      >
        <el-form-item :label="t('feedback.labels.email')" prop="email">
          <el-input
            v-model="feedbackForm.email"
            :placeholder="t('feedback.placeholders.email')"
          />
        </el-form-item>

        <el-form-item :label="t('feedback.labels.message')" prop="message">
          <el-input
            v-model="feedbackForm.message"
            type="textarea"
            :rows="6"
            :placeholder="t('feedback.placeholders.message')"
          />
        </el-form-item>

        <div class="dialog-actions">
          <el-button @click="dialogVisible = false">
            {{ t("feedback.buttons.cancel") }}
          </el-button>
          <el-button type="primary" :loading="submitting" @click="submitFeedback">
            {{ t("feedback.buttons.submit") }}
          </el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { i18nState, translate } from "@/i18n";

export default {
  name: "FeedbackPage",
  data() {
    return {
      dialogVisible: true,
      submitting: false,
      lastSavedAt: "",
      feedbackForm: {
        email: "",
        message: "",
      },
      fromPage: "",
    };
  },
  computed: {
    lang() {
      return i18nState.lang;
    },
    rules() {
      return {
        email: [
          {
            type: "email",
            message: this.t("feedback.rules.emailInvalid"),
            trigger: ["blur", "change"],
          },
        ],
        message: [
          {
            required: true,
            message: this.t("feedback.rules.messageRequired"),
            trigger: "blur",
          },
          {
            min: 8,
            message: this.t("feedback.rules.messageLength"),
            trigger: "blur",
          },
        ],
      };
    },
  },
  mounted() {
    const fromPage = this.$route.query.from || "";
    this.fromPage = fromPage;
  },
  methods: {
    t(path) {
      return translate(this.lang, path);
    },
    onDialogClosed() {
      if (this.$route.name === "feedback") {
        this.$router.replace({ name: "home" });
      }
    },
    submitFeedback() {
      this.$refs.feedbackForm.validate(async (valid) => {
        if (!valid) {
          return false;
        }

        this.submitting = true;
        try {
          const payload = {
            contact: this.feedbackForm.email,
            page: this.fromPage,
            message: this.feedbackForm.message,
            lang: this.lang,
            timestamp: new Date().toISOString(),
            userAgent: window.navigator.userAgent,
          };

          const response = await fetch("/api/feedback", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error("Request failed");
          }

          this.lastSavedAt = new Date().toLocaleString();
          this.$message.success(this.t("feedback.messages.submitSuccess"));
          this.dialogVisible = false;
          this.$refs.feedbackForm.resetFields();
          this.fromPage = this.$route.query.from || "";
        } catch (error) {
          this.$message.error(this.t("feedback.messages.submitError"));
        } finally {
          this.submitting = false;
        }

        return true;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.open-dialog-btn {
  margin-top: 22px;
  border: 0;
  border-radius: 999px;
  padding: 11px 20px;
  color: #fff;
  font-size: 14px;
  background: linear-gradient(135deg, #0a84ff, #0071e3);
  box-shadow: 0 10px 18px rgba(0, 113, 227, 0.32);
  cursor: pointer;
}

.info-card {
  padding: 24px;
}

.info-title {
  margin: 0 0 8px;
  font-size: 1.1rem;
  font-weight: 600;
}

.info-text {
  margin: 0;
  line-height: 1.7;
  color: var(--text-secondary);
}

.saved-tip {
  margin: 14px 0 0;
  font-size: 0.92rem;
  color: #0071e3;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
