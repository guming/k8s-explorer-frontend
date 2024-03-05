<script setup>
import { computed, ref } from 'vue'
import { useMainStore } from '@/stores/main'
import { mdiEye, mdiTrashCan } from '@mdi/js'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'

defineProps({
  checkable: Boolean
})

const mainStore = useMainStore()
const items = computed(() => mainStore.clients)
const isModalDangerActive = ref(false)

const checkedRows = ref([])

const remove = (arr, cb) => {
  const newArr = []

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })

  return newArr
}

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client)
  } else {
    checkedRows.value = remove(checkedRows.value, (row) => row.id === client.id)
  }
}
</script>

<template>

  <CardBoxModal v-model="isModalDangerActive" title="Please confirm" button="danger" has-cancel>
    <p>This is a danger operation <b>Confirm</b></p>
  </CardBoxModal>

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th>UID</th>
        <th>Name</th>
        <th>Type</th>
        <th>Status</th>
        <th>Synced</th>
        <th>VclusterRef</th>
        <th>SecretRef</th>
        <th>Debug</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in items" :key="client.id">
        <TableCheckboxCell v-if="checkable" @checked="checked($event, client)" />
        <td data-label="uid">
          {{ client.metadata.uid }}
        </td>
        <td data-label="name">
          {{ client.metadata.name }}
        </td>
        <td data-label="type">
          {{ client.spec.compositionSelector.matchLabels.type }}
        </td>
        <td data-label="status">
          {{ client.status.conditions[1].status }}
        </td>
        <td data-label="synced">
          {{ client.status.conditions[0].status }}
        </td>
        <td data-label="vclusterRef">
          {{ client.spec.resourceRef.name }}
        </td>
        <td data-label="secretRef">
          {{ client.spec.writeConnectionSecretToRef.name }}
        </td>
        <td data-label="Debug" >
          {{
            client.spec.parameters.frontend.debug
          }}
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="isModalDangerActive = true"
            />
          </BaseButtons>
        </td>
      </tr>
    </tbody>
  </table>
  
</template>
