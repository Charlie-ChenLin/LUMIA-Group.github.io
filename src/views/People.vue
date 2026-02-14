<template>
  <div class="page-container people-page">
    <section class="page-hero">
      <span class="page-eyebrow">Team</span>
      <h1>People</h1>
      <p>
        Meet faculty members, students, and collaborators shaping the LUMIA
        research agenda.
      </p>
    </section>

    <section
      v-for="group in groupedPeople"
      :key="group.key"
      class="group-block"
    >
      <div class="section-head">
        <h2>{{ group.key }}</h2>
        <p>
          {{ group.members.length }} member<span v-if="group.members.length > 1"
            >s</span
          >
        </p>
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

export default {
  name: "PeoplePage",
  data() {
    return {
      peopleData,
      defaultImg,
    };
  },
  computed: {
    groupedPeople() {
      return Object.entries(this.peopleData)
        .map(([key, members]) => ({ key, members }))
        .filter((group) => group.members && group.members.length);
    },
  },
  methods: {
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
