// Runs synchronously in <head>, straight after the three Amplitude loader scripts.
(function () {
  var AMP_KEY = "58bdd4beb93faabbecaaf4258cff5f6d";
  if (!window.amplitude) return;
  if (window.sessionReplay) amplitude.add(window.sessionReplay.plugin({ sampleRate: 1 }));
  if (window.engagement)    amplitude.add(window.engagement.plugin());
  amplitude.init(AMP_KEY, { fetchRemoteConfig: true, autocapture: true });

  // Restore today's demo login so refreshes and deep links keep the same user.
  try {
    var u = JSON.parse(localStorage.getItem("ejh_user") || "null");
    var today = new Date().toISOString().split("T")[0];
    if (u && u.date === today) amplitude.setUserId(u.userId);
  } catch (e) {}

  // Experiment treatment must be applied before first paint to avoid flicker.
  try {
    var q = new URLSearchParams(location.search).get("variant");
    if (q === "treatment" || q === "control") localStorage.setItem("ejh_variant", q);
    if (localStorage.getItem("ejh_variant") === "treatment") document.documentElement.classList.add("exp-bags");
  } catch (e) {}
})();
