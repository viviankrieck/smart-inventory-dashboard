<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card style="width: 420px; max-width: 95vw">
      <q-card-section class="row items-center">
        <div class="text-h6">Novo produto</div>
        <q-space />
        <q-btn flat round dense icon="close" v-close-popup />
      </q-card-section>

      <q-form @submit.prevent="handleSubmit">
        <q-card-section class="q-gutter-md">
          <q-input v-model="form.title" label="Nome do produto" outlined dense :rules="[required]" />
          <q-input v-model="form.category" label="Categoria" outlined dense :rules="[required]" />
          <div class="row q-col-gutter-sm">
            <div class="col-6">
              <q-input v-model.number="form.price" type="number" label="Preço (R$)" outlined dense :rules="[required]" />
            </div>
            <div class="col-6">
              <q-input v-model.number="form.stock" type="number" label="Estoque" outlined dense :rules="[required]" />
            </div>
          </div>
          <q-input v-model="form.description" label="Descrição" type="textarea" outlined dense autogrow />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn type="submit" color="primary" unelevated label="Salvar" :loading="isSaving" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useQuasar } from 'quasar';
import { productService } from 'src/services/productService';

const isOpen = defineModel<boolean>({ default: false });
const emit = defineEmits<{ created: [] }>();

const $q = useQuasar();
const isSaving = ref(false);

const form = reactive({
  title: '',
  category: '',
  price: 0,
  stock: 0,
  description: '',
});

const required = (val: unknown) => (val !== '' && val !== null && val !== undefined) || 'Campo obrigatório';

const resetForm = () => {
  form.title = '';
  form.category = '';
  form.price = 0;
  form.stock = 0;
  form.description = '';
};

const handleSubmit = async () => {
  isSaving.value = true;
  try {
    // A API DummyJSON simula a criação (não persiste os dados), mas o
    // fluxo/contrato é o mesmo de uma API real de cadastro de produtos.
    await productService.create({ ...form });
    $q.notify({ type: 'positive', message: 'Produto cadastrado com sucesso.' });
    resetForm();
    isOpen.value = false;
    emit('created');
  } catch {
    $q.notify({ type: 'negative', message: 'Não foi possível cadastrar o produto.' });
  } finally {
    isSaving.value = false;
  }
};
</script>
