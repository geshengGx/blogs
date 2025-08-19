<!-- 纵向布局 -->
<template>
  <div class="layout flex-center">
    <div class="layout_menu">
      <div class="flex-center gap-2 layout_menu_logo">
        <img src="/public//vite.svg" alt="logo" class="w-30px h-30px" />
        <span class="font-bold text-lg nowrap-hidden">后台管理系统</span>
      </div>
      <el-scrollbar class="!h-[calc(100%-50px)]">
        <el-menu>
          <SubMenu :menu-list="menuList" />
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_content">
      <div class="layout_content_header nowrap-hidden">
        <ToolBarLeft />
        <ToolBarRight />
      </div>
      <Tabs />
      <div class="layout_content_main">
        <div class="bg-amber wh-full"></div>
      </div>
      <div class="layout_content_footer"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SubMenu from "../components/Menu/SubMenu.vue";
import ToolBarLeft from "../components/Header/ToolBarLeft.vue";
import ToolBarRight from "../components/Header/ToolBarRight.vue";
import Tabs from "../components/Tabs/index.vue";

const menuList = [
  {
    path: "/home/index",
    name: "homeIndex",
    meta: {
      icon: "local:info",
      title: "费控首页",
      isAffix: true,
      isKeepAlive: true
    }
  },
  {
    path: "/map/index",
    name: "local:info",
    meta: {
      icon: "local:info",
      title: "地图监测"
    }
  },
  {
    path: "/energy/user-manage",
    name: "UserManage",
    meta: {
      icon: "local:info",
      title: "用户管理"
    },
    children: [
      {
        path: "/energy/user-manage/account",
        name: "UserAccount",
        meta: {
          icon: "local:info",
          title: "用户开户",
          isKeepAlive: true
        }
      },
      {
        path: "/energy/user-manage/recharge",
        name: "RechargeRecord",
        meta: {
          icon: "local:info",
          title: "充值记录",
          isKeepAlive: true
        }
      },
      {
        path: "/energy/user-manage/notification",
        name: "NotificationRecord",
        meta: {
          icon: "local:info",
          title: "通知记录"
        }
      },
      // {
      //   path: "/energy/user-manage/contract",
      //   name: "ContractRecord",
      //   component: () => import("@/views/energy/user-manage/contract/index.vue"),
      //   meta: {
      //     icon: "local:circle",
      //     title: "拉合闸记录"
      //   }
      // },
      {
        path: "/energy/user-manage/fund-log",
        name: "FundLog",
        meta: {
          icon: "local:info",
          title: "资金日志"
        }
      },
      {
        path: "/energy/user-manage/reconciliation",
        name: "Reconciliation",
        meta: {
          icon: "local:info",
          title: "对账查询"
        }
      }
    ]
  },
  {
    path: "/energy/market",
    name: "EnergyMarket",
    meta: {
      icon: "local:info",
      title: "售电管理",
      isKeepAlive: true
    },
    children: [
      {
        path: "/energy/market/operate",
        name: "Operate",
        meta: {
          icon: "local:info",
          title: "账户操作"
        }
      },
      {
        path: "/energy/market/bill",
        name: "Bill",
        meta: {
          icon: "local:info",
          title: "账单管理"
        }
      },
      {
        path: "/energy/market/Statistics",
        name: "BillStatistics",
        meta: {
          icon: "local:info",
          title: "账单统计"
        }
      },
      {
        path: "/energy/market/priceSet",
        name: "PriceSet",
        meta: {
          icon: "local:info",
          title: "电价设置"
        }
      },
      {
        path: "/energy/market/price",
        name: "Price",
        meta: {
          icon: "local:info",
          title: "电价定义"
        }
      }
    ]
  },
  {
    path: "/energy/remote",
    name: "EnergyRemote",
    meta: {
      icon: "local:info",
      title: "远程抄表",
      isKeepAlive: true
    },
    children: [
      {
        path: "/energy/remote/record",
        name: "Record",
        meta: {
          icon: "local:info",
          title: "实时抄表"
        }
      },
      {
        path: "/energy/remote/history",
        name: "History",
        meta: {
          icon: "local:info",
          title: "历史数据"
        }
      },
      {
        path: "/energy/remote/energy",
        name: "Energy",
        meta: {
          icon: "local:info",
          title: "能耗数据"
        }
      },
      {
        path: "/energy/remote/message",
        name: "Message",
        meta: {
          icon: "local:info",
          title: "告警信息"
        }
      },
      {
        path: "/energy/remote/revise",
        name: "Revise",
        meta: {
          icon: "local:info",
          title: "表码录入"
        }
      }
    ]
  },
  {
    path: "/energy/archive",
    name: "Archive",
    meta: {
      icon: "local:info",
      title: "档案管理"
    },
    children: [
      {
        path: "/energy/archive/meter-setting",
        name: "MeterSetting",
        meta: {
          icon: "local:info",
          title: "表计设置",
          isKeepAlive: true
        }
      },
      {
        path: "/energy/archive/gateway-setting",
        name: "GatewaySetting",
        meta: {
          icon: "local:info",
          title: "网关设置",
          isKeepAlive: true
        }
      },
      {
        path: "/energy/archive/cost-control-config",
        name: "CostControlConfig",
        meta: {
          icon: "local:info",
          title: "费控配置",
          isKeepAlive: true
        }
      },
      {
        path: "/energy/archive/alarm-setting",
        name: "AlarmSetting",
        meta: {
          icon: "local:info",
          title: "告警设置",
          isKeepAlive: true
        }
      },
      {
        path: "/energy/archive/common-cost-setting",
        name: "CommonCostSetting",
        meta: {
          icon: "local:info",
          title: "公摊设置",
          isKeepAlive: true
        }
      }
    ]
  },
  {
    path: "/energy/unit",
    name: "Unit",
    meta: {
      icon: "local:info",
      title: "单元管理"
    },
    children: [
      {
        path: "/energy/unit/list",
        name: "unitList",
        meta: {
          icon: "local:info",
          title: "单元列表"
        }
      }
    ]
  },
  {
    path: "/energy/system",
    name: "System",
    meta: {
      icon: "local:info",
      title: "系统设置"
    },
    children: [
      {
        path: "/energy/system/enterprise",
        name: "Enterprise",
        meta: {
          icon: "local:info",
          title: "企业信息"
        }
      },
      {
        path: "/energy/system/user",
        name: "User",
        meta: {
          icon: "local:info",
          title: "账号管理"
        }
      },
      {
        path: "/energy/system/role",
        name: "Role",
        meta: {
          icon: "local:info",
          title: "角色管理"
        }
      }
    ]
  },
  {
    path: "/security",
    name: "Security",
    meta: {
      icon: "local:info",
      title: "安防管理"
    },
    children: [
      {
        path: "/security/control",
        name: "Control",
        meta: {
          icon: "local:info",
          title: "门禁",
          isKeepAlive: true
        }
      },
      {
        path: "/security/control_details",
        name: "control_details",
        meta: {
          icon: "local:info",
          title: "门禁详情",
          isHide: true,
          activeMenu: "/security/control",
          isKeepAlive: true
        }
      },
      {
        path: "/security/camera",
        name: "Camera",
        meta: {
          icon: "local:info",
          title: "监控"
        }
      }
    ]
  }
] as Menu.MenuOptions[];
</script>
<style lang="scss" scoped>
@use "./index" as *;
</style>
