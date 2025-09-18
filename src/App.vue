<script setup lang="ts">

</script>

<template>
 <div class="relative" id="top">
  <header class="bg-foreground">
    <div>
      <h1 class="text-5xl text-center">ProjectCrane</h1>
    </div>

    <nav class="h-20">
      <ul class="flex gap-10 text-center justify-center pr-15 pt-5 relative text-3xl">
        <li><a href="">To-Do app</a></li>
        <li><a href="">Money tracker</a></li>
        <li><a href="">Notes</a></li>
        <li><a href="">HealthCare tracker</a></li>
      </ul>
    </nav>
  </header>

  <section class="top-10 relative p-5">
    <div class="pb-10">
      <h3 class="text-3xl text-main">Most Visited trackers</h3>
    </div>

    <section>
      <div class="grid grid-cols-2 gap-15 w-full">
        <aside class="w-full border-2 border-gray-500 h-dvh rounded-3xl">
          <h3 class="text-3xl text-main text-center border-b-2 border-main">Habits Tracker</h3>
          <div class="grid grid-cols-3 text-main">
            <!-- CARDS -->
            <div class="border-2 border-main w-30 h-60 p-5 m-10 grid relative">
              <ul class="flex-col flex gap-5 pb-20 relative">
                <li>
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox">Gym</label>
                </li>
                <li>
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox">Morning Routine</label>
                </li>
                <li>
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox">Read a book</label>
                </li>
                <li>
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox">Meditate</label>
                </li>
              </ul>
            </div>
            <div class="border-2 border-main w-30 h-60 p-5 m-10 grid relative">
              <ul class="flex-col flex gap-5 pb-20 relative">
                <li>
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox">Gym</label>
                </li>
                <li>
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox">Morning Routine</label>
                </li>
                <li>
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox">Read a book</label>
                </li>
                <li>
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox">Meditate</label>
                </li>
              </ul>
            </div>
            <div class="border-2 border-main w-30 h-60 p-5 m-10 grid relative">
              <ul class="flex-col flex gap-5 pb-20 relative">
                <li>
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox">Gym</label>
                </li>
                <li>
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox">Morning Routine</label>
                </li>
                <li>
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox">Read a book</label>
                </li>
                <li>
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox">Meditate</label>
                </li>
              </ul>
            </div>
            <div class="border-2 border-main w-30 h-60 p-5 m-10 grid relative">
              <ul class="flex-col flex gap-5 pb-20 relative">
                <li>
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox">Gym</label>
                </li>
                <li>
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox">Morning Routine</label>
                </li>
                <li>
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox">Read a book</label>
                </li>
                <li>
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox">Meditate</label>
                </li>
              </ul>
            </div>
            <div class="border-2 border-main w-30 h-60 p-5 m-10 grid relative">
              <ul class="flex-col flex gap-5 pb-20 relative">
                <li>
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox">Gym</label>
                </li>
                <li>
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox">Morning Routine</label>
                </li>
                <li>
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox">Read a book</label>
                </li>
                <li>
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox">Meditate</label>
                </li>
              </ul>
            </div>
            <div class="border-2 border-main w-30 h-60 p-5 m-10 grid relative">
              <ul class="flex-col flex gap-5 pb-20 relative">
                <li>
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox">Gym</label>
                </li>
                <li>
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox">Morning Routine</label>
                </li>
                <li>
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox">Read a book</label>
                </li>
                <li>
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox">Meditate</label>
                </li>
              </ul>
            </div>
          </div>
        </aside>
        <!-- SECOND ASIDE LAYOUT -->
        <aside class="w-full border-2 border-gray-500 h-dvh rounded-3xl">
          <h3 class="text-3xl text-main text-center border-b-2 border-main">Money tracker</h3>
        </aside>
      </div>

      <div class="w-full flex flex-col gap-y-10 top-10 relative border-2 border-main text-main rounded-3xl h-dvh">
        <h3 class="text-main m-7 text-4xl">Notes</h3>
        <div>
        <textarea class="w-full border border-main h-30">
          Write your last journey
        </textarea>
      </div>
        <div>
                  <textarea class="w-full border border-main h-30">
          Write your last journey
        </textarea>
        </div>
        <div>
                  <textarea class="w-full border border-main h-30">
          Write your last journey
        </textarea>
        </div>
      </div>
    </section>
  </section>

  <footer class="top-20 relative">
    <div class="top-20 relative">
      <a href="#top">
      <svg width="80" height="80" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0 0 0)" class="right-10 absolute">
      <path d="M12.5304 10.9697C12.3897 10.829 12.1989 10.75 12 10.75C11.8011 10.75 11.6103 10.829 11.4697 10.9697L5.21969 17.2197C5.00519 17.4342 4.94103 17.7568 5.05711 18.037C5.1732 18.3173 5.44668 18.5 5.75002 18.5H18.25C18.5534 18.5 18.8268 18.3173 18.9429 18.037C19.059 17.7568 18.9949 17.4342 18.7804 17.2197L12.5304 10.9697Z" fill="#343C54"/>
      <path opacity="0.4" d="M18.7803 12.7197L12.5303 6.46967C12.2374 6.17678 11.7626 6.17678 11.4697 6.46967L5.21967 12.7197C4.92678 13.0126 4.92678 13.4874 5.21967 13.7803C5.51256 14.0732 5.98744 14.0732 6.28033 13.7803L12 8.06066L17.7197 13.7803C18.0126 14.0732 18.4874 14.0732 18.7803 13.7803C19.0732 13.4874 19.0732 13.0126 18.7803 12.7197Z" fill="#343C54"/>
      </svg>
      </a>
    </div>
  </footer>
 </div> 
</template>
