<template>
  <header class="header-container">
    <div class="header-content">
      <div class="brand" @click="clickHeader({ value: 'home' })">
        <img
          v-if="headerData.logo"
          class="logo"
          :src="headerData.logo"
          alt="LUMIA logo"
        />
        <span v-else class="logo-fallback">L</span>
        <span class="name">{{ headerData.name }}</span>
      </div>

      <button
        class="menu-toggle"
        type="button"
        @click="mobileOpen = !mobileOpen"
      >
        <span></span>
        <span></span>
      </button>

      <ul class="header-list" :class="{ open: mobileOpen }">
        <li
          v-for="item in headerData.headerList"
          :key="item.value"
          class="header-item"
          :class="{
            active: activeHeader === item.value && item.type !== 'link',
          }"
          @click="clickHeader(item, true)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { headerData } from "@/data/header";

export default {
  name: "AppHeader",
  data() {
    return {
      headerData,
      activeHeader: "",
      mobileOpen: false,
    };
  },
  watch: {
    "$route.name"(routeName) {
      this.activeHeader = routeName;
      this.mobileOpen = false;
    },
  },
  mounted() {
    this.activeHeader = this.$route.name;
  },
  methods: {
    clickHeader(item, closeMenu = false) {
      if (closeMenu) {
        this.mobileOpen = false;
      }

      if (item.type === "link") {
        window.open(item.value, "_blank");
        return;
      }

      this.activeHeader = item.value;
      if (this.$route.name !== item.value) {
        this.$router.push({
          name: item.value,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 120;
  border-bottom: 1px solid var(--line-subtle);
  background: rgba(251, 251, 253, 0.78);
  backdrop-filter: blur(16px);
}

.header-content {
  width: min(100%, var(--content-width));
  height: 64px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  min-width: 0;
}

.logo {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
}

.logo-fallback {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 14px;
  color: #fff;
  background: linear-gradient(135deg, #0a84ff, #0066cc);
}

.name {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: nowrap;
}

.header-list {
  display: flex;
  align-items: center;
  gap: 4px;
}

.header-item {
  position: relative;
  padding: 10px 14px;
  border-radius: 999px;
  font-size: 13px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 180ms ease, background-color 180ms ease;
}

.header-item:hover,
.header-item.active {
  color: var(--text-primary);
  background: rgba(0, 0, 0, 0.05);
}

.menu-toggle {
  width: 36px;
  height: 36px;
  display: none;
  border: 1px solid var(--line-subtle);
  background: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  padding: 8px;
  cursor: pointer;
}

.menu-toggle span {
  display: block;
  width: 100%;
  height: 1.5px;
  margin: 4px 0;
  background: #2b2b2f;
}

@media (max-width: 900px) {
  .header-content {
    height: 60px;
  }

  .menu-toggle {
    display: inline-block;
  }

  .header-list {
    position: absolute;
    top: 64px;
    left: 14px;
    right: 14px;
    padding: 10px;
    border-radius: 18px;
    border: 1px solid var(--line-subtle);
    background: rgba(255, 255, 255, 0.94);
    backdrop-filter: blur(16px);
    display: none;
    flex-direction: column;
    gap: 0;
    box-shadow: var(--shadow-card);
  }

  .header-list.open {
    display: flex;
  }

  .header-item {
    width: 100%;
    border-radius: 12px;
    text-align: center;
  }

  .name {
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
