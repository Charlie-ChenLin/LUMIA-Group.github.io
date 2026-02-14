<template>
  <div class="page-container people-page">
    <section class="page-hero">
      <span class="page-eyebrow">{{ t("people.eyebrow") }}</span>
      <h1>{{ t("people.title") }}</h1>
      <p>{{ t("people.desc") }}</p>
    </section>

    <section
      v-for="group in groupedPeople"
      :key="group.key"
      class="group-block"
    >
      <div class="section-head">
        <h2>{{ groupLabel(group.key) }}</h2>
        <p>{{ memberCountText(group.members.length) }}</p>
      </div>

      <ul class="people-grid stagger-list">
        <li
          v-for="item in group.members"
          :key="item.id"
          class="person-card glass-card"
        >
          <img :src="item.pic || defaultImg" :alt="item.name" />
          <div class="person-info">
            <h3 @click="goto(item.homepage)">{{ item.name }}</h3>
            <p>{{ item.grade }}</p>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { peopleData } from "@/data/people";
import defaultImg from "@/assets/default.jpg";
import { i18nState, translate } from "@/i18n";

export default {
  name: "PeoplePage",
  data() {
    return {
      peopleData,
      defaultImg,
    };
  },
  computed: {
    lang() {
      return i18nState.lang;
    },
    isZh() {
      return this.lang === "zh";
    },
    groupedPeople() {
      return Object.entries(this.peopleData)
        .map(([key, members]) => ({ key, members }))
        .filter((group) => group.members && group.members.length);
    },
  },
  methods: {
    t(path) {
      return translate(this.lang, path);
    },
    groupLabel(groupKey) {
      const keyPath = `people.groups.${groupKey}`;
      const label = this.t(keyPath);
      return label === keyPath ? groupKey : label;
    },
    memberCountText(count) {
      if (this.isZh) {
        return `${count}${this.t("people.members")}`;
      }
      return `${count} ${count > 1 ? this.t("people.members") : this.t("people.member")}`;
    },
    goto(url) {
      if (url) {
        window.open(url, "_blank");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.group-block {
  margin-top: 44px;
}

.people-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.person-card {
  overflow: hidden;
}

.person-card img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-bottom: 1px solid var(--line-subtle);
}

.person-info {
  padding: 14px 14px 18px;
}

.person-info h3 {
  margin: 0 0 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}

.person-info h3:hover {
  color: var(--accent);
}

.person-info p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (max-width: 1080px) {
  .people-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 860px) {
  .people-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .people-grid {
    grid-template-columns: 1fr;
  }
}
</style>
