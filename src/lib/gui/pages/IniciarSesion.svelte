<script lang="ts">
    import { iniciarSesionGoogle } from "$lib/auth";
    import text from "$lib/text";
    import Swal from "sweetalert2";

    // let mail: string = "";
    // let password: string = "";

    async function manejarIniciarSesionGoogle(): Promise<void> {
        const usuario = await iniciarSesionGoogle();
        if (usuario == null) {
            return;
        }

        await Swal.fire({
            icon: "success",
            title: `Bienvenido, ${usuario.email}`,
            confirmButtonText: "Aceptar",
        });
    }
</script>

<svelte:head>
    <title>{text.appName}</title>
</svelte:head>

<section>
    <!-- <div class="field">
        <p class="control has-icons-left has-icons-right">
            <input
                class="input"
                type="email"
                placeholder="Correo"
                bind:value={mail}
            />
            <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
            </span>
            <span
                class={`icon is-small is-right ${
                    mail.split("@").every((x) => x.length > 0)
                        ? "has-text-success"
                        : ""
                }`}
            >
                <i class="fas fa-check"></i>
            </span>
        </p>
    </div> -->

    <!-- <div class="field">
        <p class="control has-icons-left has-icons-right">
            <input
                class="input"
                type="password"
                placeholder="Contraseña"
                bind:value={password}
            />
            <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
            </span>
            <span
                class={`icon is-small is-right ${password.length > 0 ? "has-text-success" : ""}`}
            >
                <i class="fas fa-check"></i>
            </span>
        </p>
    </div> -->

    <div class="buttons">
        <!-- <button class="button is-success is-fullwidth"> Iniciar sesión </button> -->

        <button
            class="button is-link is-fullwidth"
            on:click={() => manejarIniciarSesionGoogle()}
        >
            Iniciar sesión con Google
        </button>
    </div>
</section>

<style>
    section {
        margin-top: 1rem;
    }

    button {
        color: white;
        font-weight: bold;
        width: 100%;
    }
</style>
