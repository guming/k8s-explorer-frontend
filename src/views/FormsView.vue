<script setup lang="ts" >
import { reactive, ref } from 'vue'
import { mdiBallotOutline, mdiTicket, mdiGithub } from '@mdi/js'
import SectionMain from '../components/SectionMain.vue'
import CardBox from '../components/CardBox.vue'
import FormCheckRadioGroup from '../components/FormCheckRadioGroup.vue'
import FormFilePicker from '../components/FormFilePicker.vue'
import FormField from '../components/FormField.vue'
import FormControl from '../components/FormControl.vue'
import BaseDivider from '../components/BaseDivider.vue'
import BaseButton from '../components/BaseButton.vue'
import BaseButtons from '../components/BaseButtons.vue'
import SectionTitle from '../components/SectionTitle.vue'
import LayoutAuthenticated from '../layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton.vue'
import NotificationBarInCard from '../components/NotificationBarInCard.vue'
import GraphScreenBottomBar from '../components/GraphScreenBottomBar.vue'
import GraphScreenBottomPane from '../components/GraphScreenBottomPane.vue'
const selectOptions = [
  { id: 1, label: 'development' },
  { id: 2, label: 'staging' },
  { id: 3, label: 'production' }
]

const bottomPaneRef = ref(null as HTMLElement & { toggle: () => void } | null);

const form = reactive({
  name: '',
  installInfra: '',
  type: selectOptions[0],
  debug: '',
})

const customElementsForm = reactive({
  checkbox: ['lorem'],
  radio: 'one',
  switch: ['one'],
  file: null
})

const submit = () => {
  //
}

const formStatusWithHeader = ref(true)

const formStatusCurrent = ref(0)

const formStatusOptions = ['info', 'success', 'danger', 'warning']

const formStatusSubmit = () => {
  formStatusCurrent.value = formStatusOptions[formStatusCurrent.value + 1]
    ? formStatusCurrent.value + 1
    : 0
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiBallotOutline" title="New Environment" main>
        <BaseButton
          href="https://github.com/guming"
          target="_blank"
          :icon="mdiGithub"
          label="Star on GitHub"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
      <CardBox form @submit.prevent="submit">
        <FormField label="Name">
          <FormControl v-model="form.name" :icon="mdiTicket" />
        </FormField>

        <FormField label="InstallInfra" >
          <FormControl v-model="form.installInfra" type="switch" />
        </FormField>

        <FormField label="Debug" >
          <FormControl v-model="form.debug" type="switch" />
        </FormField>

        <FormField label="Type">
          <FormControl v-model="form.type" :options="selectOptions" />
        </FormField>

        <BaseDivider />

        <FormField label="Description" help="Description. Max 255 characters">
          <FormControl type="textarea" placeholder="Explain What&How" />
        </FormField>

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Submit" />
            <BaseButton type="reset" color="info" outline label="Reset" />
          </BaseButtons>
        </template>
      </CardBox>
      <GraphScreenBottomPane ref="bottomPaneRef" />
      <GraphScreenBottomBar
        class="self-end w-full"
        :toggle-web-term="() => bottomPaneRef && bottomPaneRef.toggle()"
      />
    </SectionMain>

  </LayoutAuthenticated>
</template>
