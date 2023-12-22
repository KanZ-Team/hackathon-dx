<template>
  <div class="home">
    <a href="/server-room"> Oyuna Başla </a>
    <a @click="isHowToPlayActive = true"> Nasıl Oynanır? </a>
    <a @click="isAboutActive = true"> Jenerik </a>

    <UModal
      v-model="isHowToPlayActive"
      :ui="{ width: 'max-w-32 sm:max-w-32', inner: 'text-[48px]' }"
    >
      <div class="p-4">
        <h1>Nasıl Oynanır?</h1>
        <Placeholder class="h-48" />
        <p style="font-size: 32px">
          Oyunun amacı, keyfinizi kaçırmadan şirketinizi ayakta tutmaktır. Bunun
          için, sunucuları gerektiğinde kapatarak, maksimum verimle
          çalıştırmalısınız. Ancak sunuculara gelen ekstra yük, sunucuları
          ısıtır ve eğer kontrol edemezseniz, sunucular yanabilir. Sunucuların
          tamamını kaybederseniz, oyunu kaybedersiniz.
        </p>
        <br />
        <p style="font-size: 32px">
          Oyunda sunuculara verilen önem kadar kendinize ve etrafınızdaki
          canlılara da önem vermelisiniz. Sunucuların yanında çalışırken,
          kendinizi yormamalı ve dinlenmeye zaman ayırmalısınız. Eğer bunları
          yapmazsanız, canınız sıkılır ve oyunu kaybedersiniz.
        </p>
        <br />
        <p style="font-size: 32px">
          Tüm sunucuları sürekli çalıştırmak, karbon ayak izinizi arttırır. Bu
          da sürdürülebilirlik açısından iyi değildir. Bu yüzden, sunucuları
          gerektiğinde kapatarak, karbon ayak izinizi düşürmelisiniz.
          Sürdürülebilir bir şirket kurmazsanız, şirketinizin geleceği tehlikeye
          girer ve oyunu kaybedersiniz.
        </p>
        <br />
        <p style="font-size: 32px">
          Oyunda üstte bulunan göstergelere tıklayarak ne anlama geldiklerini
          görebilirsiniz.
        </p>
      </div>
    </UModal>

    <UModal
      v-model="isAboutActive"
      :ui="{ width: 'max-w-24 sm:max-w-24', inner: 'text-[48px]' }"
    >
      <div class="p-4">
        <h1>Tıklamazlar</h1>
        <Placeholder class="h-48" />
        <p style="font-size: 32px">
          Gülalan, Berk ve Umutcan, sıradan bir günü paylaşmak üzere
          buluşmuşlardı. Sabah erkenden kahvaltı yaparken, Gülalan coşkulu bir
          şekilde günün planını anlatıyordu: "Arkadaşlar, bugün müthiş bir gün
          olacak! İlk önce birlikte parkta piknik yapalım, sonra sinemaya
          gidelim ve akşam yemeğini favori restoranımızda yiyelim."
          <br /><br />
          Berk, kahvesini yudumlarken gülümsedi ve ekledi: "Harika fikir! Ama
          önce biraz egzersiz yapalım mı? Belki parkta koşu yapabiliriz."
          <br /><br />
          Umutcan da katıldı: "Evet, spor yapmak iyi fikir. Sonra piknik için
          hazırlıklara başlayabiliriz."
          <br /><br />
          Birlikte parka gittiklerinde, her biri kendi aktivitesini yapmaya
          başladı. Berk koşu pistinde enerjisini boşaltırken, Gülalan piknik
          için lezzetli sandviçler hazırlıyordu. Umutcan ise parktaki çocuklarla
          futbol oynuyor, keyifli vakit geçiriyordu.
          <br /><br />
          Piknik başladığında, güneşin altında oturup sohbet ederken aniden hava
          karardı ve yağmur yağmaya başladı. Herkes panikle ne yapacaklarını
          düşünürken, Gülalan aniden çadırını çıkardı ve hızla kurmaya başladı.
          Berk ve Umutcan da ona yardım etti ve çadır altında kuru kaldılar.
          <br /><br />
          "Hey, yağmur bizi durduramaz!" diyen Gülalan gülerken, herkes rahat
          bir nefes aldı. Sinemaya gitme planı suya düşmüştü ama bu beklenmedik
          yağmur onlara eğlenceli bir anı kazandırmıştı.
          <br /><br />
          Akşam geldiğinde, yağmur durmuştu ve üçü de restorana gitmeye karar
          verdiler. Lezzetli yemekler yediler, günün maceralarını anlattılar ve
          beraber güldüler.
          <br /><br />
          Sonunda, Gülalan, Berk ve Umutcan'ın sıradan bir günü beklenmedik
          olaylarla dolu, ama bir o kadar da eğlenceli geçmişti. Her şeye
          rağmen, birlikte vakit geçirmenin ve arkadaşlıklarını sürdürmenin
          önemini bir kez daha kavramışlardı.
        </p>
      </div>
    </UModal>
  </div>
</template>

<script>
import { mapStores } from 'pinia'

export default defineComponent({
  data() {
    return {
      isHowToPlayActive: false,
      isAboutActive: false
    }
  },
  computed: {
    ...mapStores(useGameStore)
  }
})
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.home + .back-button {
  display: none;
}
</style>
