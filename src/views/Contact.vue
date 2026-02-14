<template>
  <div class="page-container contact-page">
    <section class="page-hero">
      <span class="page-eyebrow">{{ t("contact.eyebrow") }}</span>
      <h1>{{ t("contact.title") }}</h1>
      <p>{{ t("contact.desc") }}</p>
      <button class="contact-cta" @click="gotoApplication">
        {{ t("contact.cta") }}
      </button>
    </section>

    <section class="contact-grid stagger-list">
      <article
        v-for="(item, index) in contactSections"
        :key="index"
        class="contact-card glass-card"
      >
        <h2>{{ item.header }}</h2>
        <p v-for="(line, lineIndex) in item.list" :key="lineIndex">
          {{ line }}
        </p>
      </article>
    </section>
  </div>
</template>

<script>
import { contactData } from "@/data/contact";
import { getMessage, i18nState, translate } from "@/i18n";

export default {
  name: "ContactPage",
  computed: {
    lang() {
      return i18nState.lang;
    },
    contactSections() {
      if (this.lang === "zh") {
        return this.contactData.contactList;
      }
      return this.msg("contact.sections") || this.contactData.contactList;
    },
  },
  data() {
    return {
      contactData,
    };
  },
  methods: {
    t(path) {
      return translate(this.lang, path);
    },
    msg(path) {
      return getMessage(this.lang, path);
    },
    gotoApplication() {
      this.$router.push({ name: "application" });
    },
  },
};
</script>

<style lang="less" scoped>
.contact-cta {
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

.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.contact-card {
  padding: 24px;
}

.contact-card h2 {
  margin: 0 0 14px;
  font-size: 1.28rem;
  letter-spacing: -0.01em;
}

.contact-card p {
  margin: 0 0 12px;
  color: var(--text-secondary);
  line-height: 1.75;
  text-align: justify;
}

.contact-card p:last-child {
  margin-bottom: 0;
}

@media (max-width: 880px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
