let words = {
    nouns: RAW_NOUNS_DATA,
    verbs: RAW_VERBS_DATA,
    adjectives: [],
    pronouns: []
};

const transitive = ["intransitive", "intransitive deponent", "transitive", "transitive deponent", "semi-deponent"];

const tests = {
    nouns: noun => {
        let names = [];

        if (!(noun.first in ["copiae", "tenebrae", "litterae", "insidiae", "epulae", "divitiae", "deliciae", "liberi", "arma", "castra", "manes", "moenia", "milia"])) { // pluralia tantum
            if (settings.nouns & 1n) names.push("nominative singular");
            if (settings.nouns & 4n) names.push("genitive singular");
            if (settings.nouns & 16n) names.push("dative singular");
            if (settings.nouns & 64n) names.push("accusative singular");
            if (settings.nouns & 256n) names.push("ablative singular");
            if (settings.nouns & 1024n) names.push("vocative singular");
        }

        if (!(noun.first in ["Iesus", "pontus", "sitis", "fames"])) { // singularia tantum
            if (settings.nouns & 2n) names.push("nominative plural");
            if (settings.nouns & 8n) names.push("genitive plural");
            if (settings.nouns & 32n) names.push("dative plural");
            if (settings.nouns & 128n) names.push("accusative plural");
            if (settings.nouns & 512n) names.push("ablative plural");
            if (settings.nouns & 2048n) names.push("vocative plural");
        }

        return names;
    }, verbs: verb => {
        let names = [];

        if (verb.identity.split(", ")[0].endsWith("r")) { return []; }

        // Active Indicative - Present System
        if (verb.identity.startsWith("memini") || verb.identity.startsWith("odi") || verb.present != "---") {
            names.push("first-person singular present active indicative");
            names.push("second-person singular present active indicative");
            names.push("third-person singular present active indicative");
            names.push("first-person plural present active indicative");
            names.push("second-person plural present active indicative");
            names.push("third-person plural present active indicative");

            names.push("first-person singular imperfect active indicative");
            names.push("second-person singular imperfect active indicative");
            names.push("third-person singular imperfect active indicative");
            names.push("first-person plural imperfect active indicative");
            names.push("second-person plural imperfect active indicative");
            names.push("third-person plural imperfect active indicative");

            names.push("first-person singular future active indicative");
            names.push("second-person singular future active indicative");
            names.push("third-person singular future active indicative");
            names.push("first-person plural future active indicative");
            names.push("second-person plural future active indicative");
            names.push("third-person plural future active indicative");

            // Active Subjunctive - Present System
            names.push("first-person singular present active subjunctive");
            names.push("second-person singular present active subjunctive");
            names.push("third-person singular present active subjunctive");
            names.push("first-person plural present active subjunctive");
            names.push("second-person plural present active subjunctive");
            names.push("third-person plural present active subjunctive");

            names.push("first-person singular imperfect active subjunctive");
            names.push("second-person singular imperfect active subjunctive");
            names.push("third-person singular imperfect active subjunctive");
            names.push("first-person plural imperfect active subjunctive");
            names.push("second-person plural imperfect active subjunctive");
            names.push("third-person plural imperfect active subjunctive");

            // Passive Indicative - Present System (only for transitive verbs)
            if (verb.transitive == 2 && verb.supine != "---") {
                names.push("first-person singular present passive indicative");
                names.push("second-person singular present passive indicative");
                names.push("third-person singular present passive indicative");
                names.push("first-person plural present passive indicative");
                names.push("second-person plural present passive indicative");
                names.push("third-person plural present passive indicative");

                names.push("first-person singular imperfect passive indicative");
                names.push("second-person singular imperfect passive indicative");
                names.push("third-person singular imperfect passive indicative");
                names.push("first-person plural imperfect passive indicative");
                names.push("second-person plural imperfect passive indicative");
                names.push("third-person plural imperfect passive indicative");

                names.push("first-person singular future passive indicative");
                names.push("second-person singular future passive indicative");
                names.push("third-person singular future passive indicative");
                names.push("first-person plural future passive indicative");
                names.push("second-person plural future passive indicative");
                names.push("third-person plural future passive indicative");

                // Passive Subjunctive - Present System
                names.push("first-person singular present passive subjunctive");
                names.push("second-person singular present passive subjunctive");
                names.push("third-person singular present passive subjunctive");
                names.push("first-person plural present passive subjunctive");
                names.push("second-person plural present passive subjunctive");
                names.push("third-person plural present passive subjunctive");

                names.push("first-person singular imperfect passive subjunctive");
                names.push("second-person singular imperfect passive subjunctive");
                names.push("third-person singular imperfect passive subjunctive");
                names.push("first-person plural imperfect passive subjunctive");
                names.push("second-person plural imperfect passive subjunctive");
                names.push("third-person plural imperfect passive subjunctive");
            }

            names.push("imperative second-person singular present active");
            names.push("imperative second-person plural present active");
        }

        // Active Indicative - Perfect System
        if (verb.perfect != "---") {
            names.push("first-person singular perfect active indicative");
            names.push("second-person singular perfect active indicative");
            names.push("third-person singular perfect active indicative");
            names.push("first-person plural perfect active indicative");
            names.push("second-person plural perfect active indicative");
            names.push("third-person plural perfect active indicative");

            names.push("first-person singular pluperfect active indicative");
            names.push("second-person singular pluperfect active indicative");
            names.push("third-person singular pluperfect active indicative");
            names.push("first-person plural pluperfect active indicative");
            names.push("second-person plural pluperfect active indicative");
            names.push("third-person plural pluperfect active indicative");

            names.push("first-person singular future perfect active indicative");
            names.push("second-person singular future perfect active indicative");
            names.push("third-person singular future perfect active indicative");
            names.push("first-person plural future perfect active indicative");
            names.push("second-person plural future perfect active indicative");
            names.push("third-person plural future perfect active indicative");

            // Active Subjunctive - Perfect System
            names.push("first-person singular perfect active subjunctive");
            names.push("second-person singular perfect active subjunctive");
            names.push("third-person singular perfect active subjunctive");
            names.push("first-person plural perfect active subjunctive");
            names.push("second-person plural perfect active subjunctive");
            names.push("third-person plural perfect active subjunctive");

            names.push("first-person singular pluperfect active subjunctive");
            names.push("second-person singular pluperfect active subjunctive");
            names.push("third-person singular pluperfect active subjunctive");
            names.push("first-person plural pluperfect active subjunctive");
            names.push("second-person plural pluperfect active subjunctive");
            names.push("third-person plural pluperfect active subjunctive");
        }

        // Passive Indicative & Subjunctive - Perfect System (only for transitive verbs)
        if ((verb.transitive == 2 || verb.transitive == 4) && verb.supine != "---") {
            names.push("first-person singular perfect passive indicative");
            names.push("second-person singular perfect passive indicative");
            names.push("third-person singular perfect passive indicative");
            names.push("first-person plural perfect passive indicative");
            names.push("second-person plural perfect passive indicative");
            names.push("third-person plural perfect passive indicative");

            names.push("first-person singular pluperfect passive indicative");
            names.push("second-person singular pluperfect passive indicative");
            names.push("third-person singular pluperfect passive indicative");
            names.push("first-person plural pluperfect passive indicative");
            names.push("second-person plural pluperfect passive indicative");
            names.push("third-person plural pluperfect passive indicative");

            names.push("first-person singular future perfect passive indicative");
            names.push("second-person singular future perfect passive indicative");
            names.push("third-person singular future perfect passive indicative");
            names.push("first-person plural future perfect passive indicative");
            names.push("second-person plural future perfect passive indicative");
            names.push("third-person plural future perfect passive indicative");

            names.push("first-person singular perfect passive subjunctive");
            names.push("second-person singular perfect passive subjunctive");
            names.push("third-person singular perfect passive subjunctive");
            names.push("first-person plural perfect passive subjunctive");
            names.push("second-person plural perfect passive subjunctive");
            names.push("third-person plural perfect passive subjunctive");

            names.push("first-person singular pluperfect passive subjunctive");
            names.push("second-person singular pluperfect passive subjunctive");
            names.push("third-person singular pluperfect passive subjunctive");
            names.push("first-person plural pluperfect passive subjunctive");
            names.push("second-person plural pluperfect passive subjunctive");
            names.push("third-person plural pluperfect passive subjunctive");
        }

        // Infinitives
        names.push("present active infinitive");

        if (verb.transitive == 2) {
            names.push("present passive infinitive");
        }

        if (verb.perfect != "---" && verb.perfect != "") {
            names.push("perfect active infinitive");
        }

        if (verb.supine != "---" || verb.perfect.endsWith("fu")) {
            names.push("future active infinitive");
        }

        if (verb.transitive == 2 && verb.supine != "---") {
            names.push("perfect passive infinitive");
            names.push("future passive infinitive");
        }

        return names.filter(
            e => settings.verbs & BigInt(Object.keys(verbforms).filter(
                f => verbforms[f].includes(e)
            )[0])
        );
    }
};

const machines = {
    nouns: {
        display: noun => {
            return [
                {
                    text: "<span style='font-size:17px'><b>NOUN:</b></span>",
                    wait: 0
                }, {
                    text: `<br><span><i>${noun.identity}</i> (${noun.gender[0]}) — ${noun.meaning}</span>`,
                    wait: 0
                }
            ];
        },
        tests: [
            {
                name: "nominative singular",
                task: "Give the nominative singular.",
                answer: noun => noun.first,
                level: [0, 0.5]
            }, {
                name: "nominative plural",
                task: "Give the nominative plural.",
                answer: noun => {
                    switch (noun.declension) {
                        case 1:
                            return noun.stem + "ae";
                        case 2:
                            if (noun.gender == "neuter") {
                                return noun.stem + "a";
                            }

                            return noun.stem + "i";
                        case 3:
                            if (noun.gender == "neuter") {
                                return noun.stem + "a";
                            }

                            return noun.stem + "es";
                        case 3.5:
                            if (noun.gender == "neuter") {
                                return noun.stem + "ia";
                            }

                            return noun.stem + "es";
                        case 4:
                            if (noun.gender == "neuter") {
                                return noun.stem + "a";
                            }

                            return noun.stem + "us";
                        case 5:
                            return noun.stem + "es";
                    }
                },
                level: [1, 5]
            }, {
                name: "genitive singular",
                task: "Give the genitive singular.",
                answer: noun => {
                    switch (noun.declension) {
                        case 1:
                            return noun.stem + "ae";
                        case 2:
                            return noun.stem + "i";
                        case 3:
                            return noun.stem + "is";
                        case 3.5:
                            return noun.stem + "is";
                        case 4:
                            if (noun.first == "Iesus") {
                                return "Iesu";
                            }

                            return noun.stem + "us";
                        case 5:
                            return noun.stem + "ei";
                    }
                },
                level: [0, 0.5]
            }, {
                name: "genitive plural",
                task: "Give the genitive plural.",
                answer: noun => {
                    switch (noun.declension) {
                        case 1:
                            return noun.stem + "arum";
                        case 2:
                            return noun.stem + "orum";
                        case 3:
                            if (noun.first == "vas") {
                                return "vasorum";
                            }

                            return noun.stem + "um";
                        case 3.5:
                            return noun.stem + "ium";
                        case 4:
                            return noun.stem + "uum";
                        case 5:
                            return noun.stem + "erum";
                    }
                },
                level: [0.75, 5]
            }, {
                name: "dative singular",
                task: "Give the dative singular.",
                answer: noun => {
                    switch (noun.declension) {
                        case 1:
                            return noun.stem + "ae";
                        case 2:
                            return noun.stem + "o";
                        case 3:
                            return noun.stem + "i";
                        case 3.5:
                            return noun.stem + "i";
                        case 4:
                            if (noun.first == "Iesus") {
                                return "Iesu";
                            }

                            if (noun.gender == "neuter") {
                                return noun.stem + "u";
                            }

                            return noun.stem + "ui";
                        case 5:
                            return noun.stem + "ei";
                    }
                },
                level: [0.5, 5]
            }, {
                name: "dative plural",
                task: "Give the dative plural.",
                answer: noun => {
                    if (noun.first == "domus") {
                        return "domibus";
                    }

                    switch (noun.declension) {
                        case 1:
                            return noun.stem + "is";
                        case 2:
                            if (noun.first == "iugerum") {
                                return "iugeribus";
                            }

                            return noun.stem + "is";
                        case 3:
                            if (noun.first == "vas") {
                                return "vasis";
                            }

                            return noun.stem + "ibus";
                        case 3.5:
                            return noun.stem + "ibus";
                        case 4:
                            if (noun.first in ["arcus", "acus", "lacus", "quercus", "specus", "tribus", "partus", "artus"]) {
                                return noun.stem + "ubus";
                            }

                            return noun.stem + "ibus";
                        case 5:
                            return noun.stem + "ebus";
                    }
                },
                level: [0.75, 5]
            }, {
                name: "accusative singular",
                task: "Give the accusative singular.",
                answer: noun => {
                    switch (noun.declension) {
                        case 1:
                            return noun.stem + "am";
                        case 2:
                            if (noun.gender == "neuter") {
                                return noun.first;
                            }

                            return noun.stem + "um";
                        case 3:
                            if (noun.gender == "neuter") {
                                return noun.first;
                            }

                            return noun.stem + "em";
                        case 3.5:
                            if (noun.first in ["amussis", "buris", "ravis", "sitis", "tussis", "Neapolis", "Caralis", "Tiberis", "Araris"]) {
                                return noun.stem + "im";
                            }

                            if (noun.gender == "neuter") {
                                return noun.first;
                            }

                            return noun.stem + "em";
                        case 4:
                            if (noun.gender == "neuter") {
                                return noun.first;
                            }

                            return noun.stem + "um";
                        case 5:
                            return noun.stem + "em";
                    }
                },
                level: [1, 5]
            }, {
                name: "accusative plural",
                task: "Give the accusative plural.",
                answer: noun => {
                    switch (noun.declension) {
                        case 1:
                            return noun.stem + "as";
                        case 2:
                            if (noun.gender == "neuter") {
                                return noun.stem + "a";
                            }

                            return noun.stem + "os";
                        case 3:
                            if (noun.gender == "neuter") {
                                return noun.stem + "a";
                            }

                            return noun.stem + "es";
                        case 3.5:
                            if (noun.gender == "neuter") {
                                return noun.stem + "ia";
                            }

                            return noun.stem + "es";
                        case 4:
                            if (noun.gender == "neuter") {
                                return noun.stem + "a";
                            }

                            return noun.stem + "us";
                        case 5:
                            return noun.stem + "es";
                    }
                },
                level: [0.5, 5]
            }, {
                name: "ablative singular",
                task: "Give the ablative singular.",
                answer: noun => {
                    switch (noun.declension) {
                        case 1:
                            return noun.stem + "a";
                        case 2:
                            return noun.stem + "o";
                        case 3:
                            return noun.stem + "e";
                        case 3.5:
                            if (noun.first in ["amussis", "buris", "ravis", "sitis", "tussis", "Neapolis", "Caralis", "Tiberis", "Araris"]) {
                                return noun.stem + "i";
                            }

                            return noun.stem + "e";
                        case 4:
                            return noun.stem + "u";
                        case 5:
                            return noun.stem + "e";
                    }
                },
                level: [1, 5]
            }, {
                name: "ablative plural",
                task: "Give the ablative plural.",
                answer: noun => {
                    if (noun.first == "domus") {
                        return "domibus";
                    }

                    switch (noun.declension) {
                        case 1:
                            return noun.stem + "is";
                        case 2:
                            if (noun.first == "iugerum") {
                                return "iugeribus";
                            }

                            return noun.stem + "is";
                        case 3:
                            if (noun.first == "vas") {
                                return "vasis";
                            }

                            return noun.stem + "ibus";
                        case 3.5:
                            return noun.stem + "ibus";
                        case 4:
                            return noun.stem + "ibus";
                        case 5:
                            return noun.stem + "ebus";
                    }
                },
                level: [0.5, 5]
            }, {
                name: "vocative singular",
                task: "Give the vocative singular.",
                answer: noun => {
                    if (noun.declension == 2) {
                        if (noun.first.substring(noun.first.length - 3, noun.first.length) == "ius") {
                            return noun.stem + "i";
                        } else if (noun.first.substring(noun.first.length - 2, noun.first.length) == "us") {
                            return noun.stem + "e";
                        }

                        return noun.first;
                    } else {
                        if (noun.first == "Iesus") {
                            return "Iesu";
                        }

                        return noun.first;
                    }
                },
                level: [0.25, 0.25]
            }, {
                name: "vocative plural",
                task: "Give the vocative plural.",
                answer: noun => {
                    switch (noun.declension) {
                        case 1:
                            return noun.stem + "ae";
                        case 2:
                            if (noun.gender == "neuter") {
                                return noun.stem + "a";
                            }

                            return noun.stem + "i";
                        case 3:
                            if (noun.gender == "neuter") {
                                return noun.stem + "a";
                            }

                            return noun.stem + "es";
                        case 3.5:
                            if (noun.gender == "neuter") {
                                return noun.stem + "ia";
                            }

                            return noun.stem + "es";
                        case 4:
                            if (noun.gender == "neuter") {
                                return noun.stem + "a";
                            }

                            return noun.stem + "us";
                        case 5:
                            return noun.stem + "es";
                    }
                },
                level: [0.25, 0.25]
            }
        ]
    }, verbs: {
        display: verb => {
            let transitiveness = ` (${transitive[verb.transitive]})`;

            return [
                {
                    text: "<span style='font-size:17px'><b>VERB:</b></span>",
                    wait: 0
                }, {
                    text: `<br><span><i>${verb.identity}</i> — ${verb.meaning}${(verb.transitive == 2) ? "" : transitiveness}</span>`,
                    wait: 0
                }
            ];
        },
        tests: [
            {
                name: "imperative second-person singular present active",
                task: "Give the second-person singular present active imperative.",
                answer: verb => {
                    // Irregulars
                    if (verb.identity.startsWith("dico")) return "dic";
                    if (verb.identity.startsWith("duco")) return "duc";
                    if (verb.identity.startsWith("facio")) return "fac";
                    if (verb.identity.startsWith("fero")) return "fer";
                    if (verb.identity.startsWith("sum")) return "es";
                    if (verb.identity.startsWith("eo")) return "i";
                    if (verb.identity.startsWith("nolo")) return "noli";
                    if (verb.identity.startsWith("memini")) return "memento";

                    // Regulars
                    switch (verb.conjugation) {
                        case 1: return verb.present + "a";
                        case 2: return verb.present + "e";
                        case 3: return verb.present + "e";
                        case 3.5: return verb.present + "e";
                        case 4: return verb.present + "i";
                    }
                },
                level: [0, 5]
            }, {
                name: "imperative second-person plural present active",
                task: "Give the second-person plural present active imperative.",
                answer: verb => {
                    // Irregulars
                    if (verb.identity.startsWith("fero")) return "ferte";
                    if (verb.identity.startsWith("sum")) return "este";
                    if (verb.identity.startsWith("eo")) return "ite";
                    if (verb.identity.startsWith("nolo")) return "nolite";
                    if (verb.identity.startsWith("memini")) return "mementote";

                    // Regulars
                    switch (verb.conjugation) {
                        case 1: return verb.present + "ate";
                        case 2: return verb.present + "ete";
                        case 3: return verb.present + "ite";
                        case 3.5: return verb.present + "ite";
                        case 4: return verb.present + "ite";
                    }
                },
                level: [0, 5]
            }, {
                name: "first-person singular present active indicative",
                task: "Give the first-person singular present active indicative.",
                answer: verb => {
                    if (verb.identity.startsWith("memini")) return "memini";
                    if (verb.identity.startsWith("odi")) return "odi";
                    return verb.identity.split(", ")[0];
                },
                level: [0, 0.5]
            }, {
                name: "second-person singular present active indicative",
                task: "Give the second-person singular present active indicative.",
                answer: verb => {
                    if (verb.identity.startsWith("memini")) return "meministi";
                    if (verb.identity.startsWith("odi")) return "odisti";
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "as";
                        case 2:
                            return verb.present + "es";
                        case 3:
                            return verb.present + "is";
                        case 3.5:
                            return verb.present + "is";
                        case 4:
                            return verb.present + "is";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "fers";
                            } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                                return verb.present + "is";
                            } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                                return verb.present + "es";
                            } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                                return verb.present + "vis";
                            } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                                return verb.present + "non vis";
                            } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                                return verb.present + "mavis";
                            } else if (verb.identity.split(", ")[0].endsWith("for")) {
                                return "faris";
                            } else if (verb.identity == "edo, edere, edi, esus") {
                                return "edis";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fis";
                            }
                    }
                },
                level: [0, 0.5]
            }, {
                name: "third-person singular present active indicative",
                task: "Give the third-person singular present active indicative.",
                answer: verb => {
                    if (verb.identity.startsWith("memini")) return "meminit";
                    if (verb.identity.startsWith("odi")) return "odit";
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "at";
                        case 2:
                            return verb.present + "et";
                        case 3:
                            return verb.present + "it";
                        case 3.5:
                            return verb.present + "it";
                        case 4:
                            return verb.present + "it";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "fert";
                            } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                                return verb.present + "it";
                            } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                                return verb.present + "est";
                            } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                                return verb.present + "vult";
                            } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                                return verb.present + "non vult";
                            } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                                return verb.present + "mavult";
                            } else if (verb.identity.split(", ")[0].endsWith("for")) {
                                return "fatur";
                            } else if (verb.identity == "edo, edere, edi, esus") {
                                return "edit";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fit";
                            }
                    }
                },
                level: [0, 0.5]
            }, {
                name: "first-person plural present active indicative",
                task: "Give the first-person plural present active indicative.",
                answer: verb => {
                    if (verb.identity.startsWith("memini")) return "meminimus";
                    if (verb.identity.startsWith("odi")) return "odimus";
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "amus";
                        case 2:
                            return verb.present + "emus";
                        case 3:
                            return verb.present + "imus";
                        case 3.5:
                            return verb.present + "imus";
                        case 4:
                            return verb.present + "imus";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "ferimus";
                            } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                                return verb.present + "imus";
                            } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                                return verb.present + "sumus";
                            } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                                return verb.present + "volumus";
                            } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                                return verb.present + "nolumus";
                            } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                                return verb.present + "malumus";
                            } else if (verb.identity.split(", ")[0].endsWith("for")) {
                                return "famur";
                            } else if (verb.identity == "edo, edere, edi, esus") {
                                return "edimus";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fimus";
                            }
                    }
                },
                level: [0.125, 5]
            }, {
                name: "second-person plural present active indicative",
                task: "Give the second-person plural present active indicative.",
                answer: verb => {
                    if (verb.identity.startsWith("memini")) return "meministis";
                    if (verb.identity.startsWith("odi")) return "odistis";
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "atis";
                        case 2:
                            return verb.present + "etis";
                        case 3:
                            return verb.present + "itis";
                        case 3.5:
                            return verb.present + "itis";
                        case 4:
                            return verb.present + "itis";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "feritis";
                            } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                                return verb.present + "itis";
                            } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                                return verb.present + "estis";
                            } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                                return verb.present + "vultis";
                            } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                                return verb.present + "non vultis";
                            } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                                return verb.present + "mavultis";
                            } else if (verb.identity.split(", ")[0].endsWith("for")) {
                                return "famini";
                            } else if (verb.identity == "edo, edere, edi, esus") {
                                return "editis";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fitis";
                            }
                    }
                },
                level: [0.125, 5]
            }, {
                name: "third-person plural present active indicative",
                task: "Give the third-person plural present active indicative.",
                answer: verb => {
                    if (verb.identity.startsWith("memini")) return "meminerunt";
                    if (verb.identity.startsWith("odi")) return "oderunt";
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "ant";
                        case 2:
                            return verb.present + "ent";
                        case 3:
                            return verb.present + "unt";
                        case 3.5:
                            return verb.present + "iunt";
                        case 4:
                            return verb.present + "iunt";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "ferunt";
                            } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                                return verb.present + "eunt";
                            } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                                return verb.present + "sunt";
                            } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                                return verb.present + "volunt";
                            } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                                return verb.present + "nolunt";
                            } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                                return verb.present + "malunt";
                            } else if (verb.identity.split(", ")[0].endsWith("for")) {
                                return "fantur";
                            } else if (verb.identity == "edo, edere, edi, esus") {
                                return "edunt";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiunt";
                            }
                    }
                },
                level: [0.125, 5]
            }, {
                name: "first-person singular imperfect active indicative",
                task: "Give the first-person singular imperfect active indicative.",
                answer: verb => {
                    if (verb.identity.startsWith("memini")) return "memineram";
                    if (verb.identity.startsWith("odi")) return "oderam";
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "abam";
                        case 2:
                            return verb.present + "ebam";
                        case 3:
                            return verb.present + "ebam";
                        case 3.5:
                            return verb.present + "iebam";
                        case 4:
                            return verb.present + "iebam";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "ferebam";
                            } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                                return verb.present + "ibam";
                            } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                                return verb.present + "eram";
                            } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                                return verb.present + "volebam";
                            } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                                return verb.present + "nolebam";
                            } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                                return verb.present + "malebam";
                            } else if (verb.identity.split(", ")[0].endsWith("for")) {
                                return "fabar";
                            } else if (verb.identity == "edo, edere, edi, esus") {
                                return "edebam";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiebam";
                            }
                    }
                },
                level: [1, 5]
            }, {
                name: "second-person singular imperfect active indicative",
                task: "Give the second-person singular imperfect active indicative.",
                answer: verb => {
                    if (verb.identity.startsWith("memini")) return "memineras";
                    if (verb.identity.startsWith("odi")) return "oderas";
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "abas";
                        case 2:
                            return verb.present + "ebas";
                        case 3:
                            return verb.present + "ebas";
                        case 3.5:
                            return verb.present + "iebas";
                        case 4:
                            return verb.present + "iebas";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "ferebas";
                            } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                                return verb.present + "ibas";
                            } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                                return verb.present + "eras";
                            } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                                return verb.present + "volebas";
                            } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                                return verb.present + "nolebas";
                            } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                                return verb.present + "malebas";
                            } else if (verb.identity.split(", ")[0].endsWith("for")) {
                                return "fabaris";
                            } else if (verb.identity == "edo, edere, edi, esus") {
                                return "edebas";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiebas";
                            }
                    }
                },
                level: [1, 5]
            }, {
                name: "third-person singular imperfect active indicative",
                task: "Give the third-person singular imperfect active indicative.",
                answer: verb => {
                    if (verb.identity.startsWith("memini")) return "meminerat";
                    if (verb.identity.startsWith("odi")) return "oderat";
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "abat";
                        case 2:
                            return verb.present + "ebat";
                        case 3:
                            return verb.present + "ebat";
                        case 3.5:
                            return verb.present + "iebat";
                        case 4:
                            return verb.present + "iebat";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "ferebat";
                            } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                                return verb.present + "ibat";
                            } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                                return verb.present + "erat";
                            } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                                return verb.present + "volebat";
                            } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                                return verb.present + "nolebat";
                            } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                                return verb.present + "malebat";
                            } else if (verb.identity.split(", ")[0].endsWith("for")) {
                                return "fabatur";
                            } else if (verb.identity == "edo, edere, edi, esus") {
                                return "edebat";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiebat";
                            }
                    }
                },
                level: [1, 5]
            }, {
                name: "first-person plural imperfect active indicative",
                task: "Give the first-person plural imperfect active indicative.",
                answer: verb => {
                    if (verb.identity.startsWith("memini")) return "memineramus";
                    if (verb.identity.startsWith("odi")) return "oderamus";
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "abamus";
                        case 2:
                            return verb.present + "ebamus";
                        case 3:
                            return verb.present + "ebamus";
                        case 3.5:
                            return verb.present + "iebamus";
                        case 4:
                            return verb.present + "iebamus";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "ferebamus";
                            } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                                return verb.present + "ibamus";
                            } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                                return verb.present + "eramus";
                            } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                                return verb.present + "volebamus";
                            } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                                return verb.present + "nolebamus";
                            } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                                return verb.present + "malebamus";
                            } else if (verb.identity.split(", ")[0].endsWith("for")) {
                                return "fabamur";
                            } else if (verb.identity == "edo, edere, edi, esus") {
                                return "edebamus";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiebamus";
                            }
                    }
                },
                level: [1, 5]
            }, {
                name: "second-person plural imperfect active indicative",
                task: "Give the second-person plural imperfect active indicative.",
                answer: verb => {
                    if (verb.identity.startsWith("memini")) return "memineratis";
                    if (verb.identity.startsWith("odi")) return "oderatis";
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "abatis";
                        case 2:
                            return verb.present + "ebatis";
                        case 3:
                            return verb.present + "ebatis";
                        case 3.5:
                            return verb.present + "iebatis";
                        case 4:
                            return verb.present + "iebatis";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "ferebatis";
                            } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                                return verb.present + "ibatis";
                            } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                                return verb.present + "eratis";
                            } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                                return verb.present + "volebatis";
                            } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                                return verb.present + "nolebatis";
                            } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                                return verb.present + "malebatis";
                            } else if (verb.identity.split(", ")[0].endsWith("for")) {
                                return "fabamini";
                            } else if (verb.identity == "edo, edere, edi, esus") {
                                return "edebatis";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiebatis";
                            }
                    }
                },
                level: [1, 5]
            }, {
                name: "third-person plural imperfect active indicative",
                task: "Give the third-person plural imperfect active indicative.",
                answer: verb => {
                    if (verb.identity.startsWith("memini")) return "meminerant";
                    if (verb.identity.startsWith("odi")) return "oderant";
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "abant";
                        case 2:
                            return verb.present + "ebant";
                        case 3:
                            return verb.present + "ebant";
                        case 3.5:
                            return verb.present + "iebant";
                        case 4:
                            return verb.present + "iebant";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "ferebant";
                            } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                                return verb.present + "ibant";
                            } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                                return verb.present + "erant";
                            } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                                return verb.present + "volebant";
                            } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                                return verb.present + "nolebant";
                            } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                                return verb.present + "malebant";
                            } else if (verb.identity.split(", ")[0].endsWith("for")) {
                                return "fabantur";
                            } else if (verb.identity == "edo, edere, edi, esus") {
                                return "edebant";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiebant";
                            }
                    }
                },
                level: [1, 5]
            }, {
                name: "first-person singular future active indicative",
                task: "Give the first-person singular future active indicative.",
                answer: verb => {
                    if (verb.identity.startsWith("memini")) return "meminero";
                    if (verb.identity.startsWith("odi")) return "odero";
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "abo";
                        case 2:
                            return verb.present + "ebo";
                        case 3:
                            return verb.present + "am";
                        case 3.5:
                            return verb.present + "iam";
                        case 4:
                            return verb.present + "iam";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "feram";
                            } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                                return verb.present + "ibo";
                            } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                                return verb.present + "ero";
                            } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                                return verb.present + "volam";
                            } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                                return verb.present + "nolam";
                            } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                                return verb.present + "malam";
                            } else if (verb.identity.split(", ")[0].endsWith("for")) {
                                return "fabor";
                            } else if (verb.identity == "edo, edere, edi, esus") {
                                return "edam";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiam";
                            }
                    }
                },
                level: [1, 5]
            }, {
                name: "second-person singular future active indicative",
                task: "Give the second-person singular future active indicative.",
                answer: verb => {
                    if (verb.identity.startsWith("memini")) return "memineris";
                    if (verb.identity.startsWith("odi")) return "oderis";
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "abis";
                        case 2:
                            return verb.present + "ebis";
                        case 3:
                            return verb.present + "es";
                        case 3.5:
                            return verb.present + "ies";
                        case 4:
                            return verb.present + "ies";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "feres";
                            } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                                return verb.present + "ibis";
                            } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                                return verb.present + "eris";
                            } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                                return verb.present + "voles";
                            } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                                return verb.present + "noles";
                            } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                                return verb.present + "males";
                            } else if (verb.identity.split(", ")[0].endsWith("for")) {
                                return "faberis";
                            } else if (verb.identity == "edo, edere, edi, esus") {
                                return "edes";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fies";
                            }
                    }
                },
                level: [1, 5]
            }, {
                name: "third-person singular future active indicative",
                task: "Give the third-person singular future active indicative.",
                answer: verb => {
                    if (verb.identity.startsWith("memini")) return "meminerit";
                    if (verb.identity.startsWith("odi")) return "oderit";
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "abit";
                        case 2:
                            return verb.present + "ebit";
                        case 3:
                            return verb.present + "et";
                        case 3.5:
                            return verb.present + "iet";
                        case 4:
                            return verb.present + "iet";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "feret";
                            } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                                return verb.present + "ibit";
                            } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                                return verb.present + "erit";
                            } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                                return verb.present + "volet";
                            } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                                return verb.present + "nolet";
                            } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                                return verb.present + "malet";
                            } else if (verb.identity.split(", ")[0].endsWith("for")) {
                                return "fabitur";
                            } else if (verb.identity == "edo, edere, edi, esus") {
                                return "edet";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiet";
                            }
                    }
                },
                level: [1, 5]
            }, {
                name: "first-person plural future active indicative",
                task: "Give the first-person plural future active indicative.",
                answer: verb => {
                    if (verb.identity.startsWith("memini")) return "meminerimus";
                    if (verb.identity.startsWith("odi")) return "oderimus";
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "abimus";
                        case 2:
                            return verb.present + "ebimus";
                        case 3:
                            return verb.present + "emus";
                        case 3.5:
                            return verb.present + "iemus";
                        case 4:
                            return verb.present + "iemus";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "feremus";
                            } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                                return verb.present + "ibimus";
                            } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                                return verb.present + "erimus";
                            } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                                return verb.present + "volemus";
                            } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                                return verb.present + "nolemus";
                            } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                                return verb.present + "malemus";
                            } else if (verb.identity.split(", ")[0].endsWith("for")) {
                                return "fabimur";
                            } else if (verb.identity == "edo, edere, edi, esus") {
                                return "edemus";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiemus";
                            }
                    }
                },
                level: [1, 5]
            }, {
                name: "second-person plural future active indicative",
                task: "Give the second-person plural future active indicative.",
                answer: verb => {
                    if (verb.identity.startsWith("memini")) return "memineritis";
                    if (verb.identity.startsWith("odi")) return "oderitis";
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "abitis";
                        case 2:
                            return verb.present + "ebitis";
                        case 3:
                            return verb.present + "etis";
                        case 3.5:
                            return verb.present + "ietis";
                        case 4:
                            return verb.present + "ietis";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "feretis";
                            } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                                return verb.present + "ibitis";
                            } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                                return verb.present + "eritis";
                            } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                                return verb.present + "voletis";
                            } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                                return verb.present + "noletis";
                            } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                                return verb.present + "maletis";
                            } else if (verb.identity.split(", ")[0].endsWith("for")) {
                                return "fabimini";
                            } else if (verb.identity == "edo, edere, edi, esus") {
                                return "edetis";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fietis";
                            }
                    }
                },
                level: [1, 5]
            }, {
                name: "third-person plural future active indicative",
                task: "Give the third-person plural future active indicative.",
                answer: verb => {
                    if (verb.identity.startsWith("memini")) return "meminerint";
                    if (verb.identity.startsWith("odi")) return "oderint";
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "abunt";
                        case 2:
                            return verb.present + "ebunt";
                        case 3:
                            return verb.present + "ent";
                        case 3.5:
                            return verb.present + "ient";
                        case 4:
                            return verb.present + "ient";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "ferent";
                            } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                                return verb.present + "ibunt";
                            } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                                return verb.present + "erunt";
                            } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                                return verb.present + "volent";
                            } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                                return verb.present + "nolent";
                            } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                                return verb.present + "malent";
                            } else if (verb.identity.split(", ")[0].endsWith("for")) {
                                return "fabuntur";
                            } else if (verb.identity == "edo, edere, edi, esus") {
                                return "edent";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fient";
                            }
                    }
                },
                level: [1, 5]
            }, {
                name: "first-person singular perfect active indicative",
                task: "Give the first-person singular perfect active indicative.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "us sum";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "i";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.perfect + "i";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.perfect + "i";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.perfect + "i";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.perfect + "i";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.perfect + "i";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fatus sum";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return verb.perfect + "i";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.perfect + "factus sum";
                        }
                    } else {
                        return verb.perfect + "i";
                    }
                },
                level: [0.5, 5]
            }, {
                name: "second-person singular perfect active indicative",
                task: "Give the second-person singular perfect active indicative.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "us es";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "isti";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.perfect + "isti";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.perfect + "isti";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.perfect + "isti";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.perfect + "isti";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.perfect + "isti";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fatus es";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return verb.perfect + "isti";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.perfect + "factus es";
                        }
                    } else {
                        return verb.perfect + "isti";
                    }
                },
                level: [0.5, 5]
            }, {
                name: "third-person singular perfect active indicative",
                task: "Give the third-person singular perfect active indicative.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "us est";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "it";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.perfect + "it";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.perfect + "it";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.perfect + "it";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.perfect + "it";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.perfect + "it";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fatus est";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return verb.perfect + "it";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.perfect + "factus est";
                        }
                    } else {
                        return verb.perfect + "it";
                    }
                },
                level: [0.5, 5]
            }, {
                name: "first-person plural perfect active indicative",
                task: "Give the first-person plural perfect active indicative.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "i sumus";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "imus";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.perfect + "imus";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.perfect + "imus";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.perfect + "imus";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.perfect + "imus";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.perfect + "imus";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fati sumus";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return verb.perfect + "imus";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.perfect + "facti sumus";
                        }
                    } else {
                        return verb.perfect + "imus";
                    }
                },
                level: [0.5, 5]
            }, {
                name: "second-person plural perfect active indicative",
                task: "Give the second-person plural perfect active indicative.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "i estis";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "istis";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.perfect + "istis";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.perfect + "istis";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.perfect + "istis";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.perfect + "istis";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.perfect + "istis";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fati estis";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return verb.perfect + "istis";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.perfect + "facti estis";
                        }
                    } else {
                        return verb.perfect + "istis";
                    }
                },
                level: [0.5, 5]
            }, {
                name: "third-person plural perfect active indicative",
                task: "Give the third-person plural perfect active indicative.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "i sunt";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "erunt";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.perfect + "erunt";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.perfect + "erunt";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.perfect + "erunt";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.perfect + "erunt";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.perfect + "erunt";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fati sunt";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return verb.perfect + "erunt";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.perfect + "facti sunt";
                        }
                    } else {
                        return verb.perfect + "erunt";
                    }
                },
                level: [0.5, 5]
            }, {
                name: "first-person singular pluperfect active indicative",
                task: "Give the first-person singular pluperfect active indicative.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "us eram";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "eram";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.perfect + "eram";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.perfect + "eram";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.perfect + "eram";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.perfect + "eram";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.perfect + "eram";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fatus eram";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return verb.perfect + "eram";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.perfect + "factus eram";
                        }
                    } else {
                        return verb.perfect + "eram";
                    }
                },
                level: [1.25, 5]
            }, {
                name: "second-person singular pluperfect active indicative",
                task: "Give the second-person singular pluperfect active indicative.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "us eras";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "eras";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.perfect + "eras";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.perfect + "eras";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.perfect + "eras";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.perfect + "eras";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.perfect + "eras";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fatus eras";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return verb.perfect + "eras";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.perfect + "factus eras";
                        }
                    } else {
                        return verb.perfect + "eras";
                    }
                },
                level: [1.25, 5]
            }, {
                name: "third-person singular pluperfect active indicative",
                task: "Give the third-person singular pluperfect active indicative.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "us erat";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "erat";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.perfect + "erat";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.perfect + "erat";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.perfect + "erat";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.perfect + "erat";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.perfect + "erat";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fatus erat";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return verb.perfect + "erat";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.perfect + "factus erat";
                        }
                    } else {
                        return verb.perfect + "erat";
                    }
                },
                level: [1.25, 5]
            }, {
                name: "first-person plural pluperfect active indicative",
                task: "Give the first-person plural pluperfect active indicative.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "i eramus";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "eramus";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.perfect + "eramus";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.perfect + "eramus";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.perfect + "eramus";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.perfect + "eramus";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.perfect + "eramus";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fati eramus";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return verb.perfect + "eramus";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.perfect + "facti eramus";
                        }
                    } else {
                        return verb.perfect + "eramus";
                    }
                },
                level: [1.25, 5]
            }, {
                name: "second-person plural pluperfect active indicative",
                task: "Give the second-person plural pluperfect active indicative.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "i eratis";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "eratis";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.perfect + "eratis";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.perfect + "eratis";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.perfect + "eratis";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.perfect + "eratis";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.perfect + "eratis";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fati eratis";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return verb.perfect + "eratis";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.perfect + "facti eratis";
                        }
                    } else {
                        return verb.perfect + "eratis";
                    }
                },
                level: [1.25, 5]
            }, {
                name: "third-person plural pluperfect active indicative",
                task: "Give the third-person plural pluperfect active indicative.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "i erant";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "erant";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.perfect + "erant";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.perfect + "erant";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.perfect + "erant";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.perfect + "erant";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.perfect + "erant";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fati erant";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return verb.perfect + "erant";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.perfect + "facti erant";
                        }
                    } else {
                        return verb.perfect + "erant";
                    }
                },
                level: [1.25, 5]
            }, {
                name: "first-person singular future perfect active indicative",
                task: "Give the first-person singular future perfect active indicative.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "us ero";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "ero";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.perfect + "ero";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.perfect + "ero";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.perfect + "ero";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.perfect + "ero";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.perfect + "ero";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fatus ero";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return verb.perfect + "ero";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.perfect + "factus ero";
                        }
                    } else {
                        return verb.perfect + "ero";
                    }
                },
                level: [1.75, 5]
            }, {
                name: "second-person singular future perfect active indicative",
                task: "Give the second-person singular future perfect active indicative.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "us eris";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "eris";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.perfect + "eris";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.perfect + "eris";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.perfect + "eris";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.perfect + "eris";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.perfect + "eris";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fatus eris";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return verb.perfect + "eris";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.perfect + "factus eris";
                        }
                    } else {
                        return verb.perfect + "eris";
                    }
                },
                level: [1.75, 5]
            }, {
                name: "third-person singular future perfect active indicative",
                task: "Give the third-person singular future perfect active indicative.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "us erit";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "erit";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.perfect + "erit";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.perfect + "erit";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.perfect + "erit";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.perfect + "erit";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.perfect + "erit";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fatus erit";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return verb.perfect + "erit";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.perfect + "factus erit";
                        }
                    } else {
                        return verb.perfect + "erit";
                    }
                },
                level: [1.75, 5]
            }, {
                name: "first-person plural future perfect active indicative",
                task: "Give the first-person plural future perfect active indicative.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "i erimus";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "erimus";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.perfect + "erimus";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.perfect + "erimus";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.perfect + "erimus";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.perfect + "erimus";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.perfect + "erimus";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fati erimus";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return verb.perfect + "erimus";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.perfect + "facti erimus";
                        }
                    } else {
                        return verb.perfect + "erimus";
                    }
                },
                level: [1.75, 5]
            }, {
                name: "second-person plural future perfect active indicative",
                task: "Give the second-person plural future perfect active indicative.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "i eritis";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "eritis";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.perfect + "eritis";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.perfect + "eritis";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.perfect + "eritis";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.perfect + "eritis";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.perfect + "eritis";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fati eritis";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return verb.perfect + "eritis";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.perfect + "facti eritis";
                        }
                    } else {
                        return verb.perfect + "eritis";
                    }
                },
                level: [1.75, 5]
            }, {
                name: "third-person plural future perfect active indicative",
                task: "Give the third-person plural future perfect active indicative.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "i erunt";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "erint";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.perfect + "erint";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.perfect + "erint";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.perfect + "erint";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.perfect + "erint";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.perfect + "erint";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fati erint";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return verb.perfect + "erint";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.perfect + "facti erint";
                        }
                    } else {
                        return verb.perfect + "erint";
                    }
                },
                level: [1.75, 5]
            }, {
                // PRESENT ACTIVE SUBJUNCTIVE
                name: "first-person singular present active subjunctive",
                task: "Give the first-person singular present active subjunctive.",
                answer: verb => {
                    if (verb.identity.startsWith("memini")) return "meminerim";
                    if (verb.identity.startsWith("odi")) return "oderim";
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "em";
                        case 2:
                            return verb.present + "eam";
                        case 3:
                            return verb.present + "am";
                        case 3.5:
                            return verb.present + "iam";
                        case 4:
                            return verb.present + "iam";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "feram";
                            } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                                return verb.present + "eam";
                            } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                                return verb.present + "sim";
                            } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                                return verb.present + "velim";
                            } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                                return verb.present + "nolim";
                            } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                                return verb.present + "malim";
                            } else if (verb.identity.split(", ")[0].endsWith("for")) {
                                return "far";
                            } else if (verb.identity == "edo, edere, edi, esus") {
                                return "edam";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiam";
                            }
                    }
                },
                level: [2, 5]
            }, {
                name: "second-person singular present active subjunctive",
                task: "Give the second-person singular present active subjunctive.",
                answer: verb => {
                    if (verb.identity.startsWith("memini")) return "memineris";
                    if (verb.identity.startsWith("odi")) return "oderis";
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "es";
                        case 2:
                            return verb.present + "eas";
                        case 3:
                            return verb.present + "as";
                        case 3.5:
                            return verb.present + "ias";
                        case 4:
                            return verb.present + "ias";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "feras";
                            } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                                return verb.present + "eas";
                            } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                                return verb.present + "sis";
                            } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                                return verb.present + "velis";
                            } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                                return verb.present + "nolis";
                            } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                                return verb.present + "malis";
                            } else if (verb.identity.split(", ")[0].endsWith("for")) {
                                return "faris";
                            } else if (verb.identity == "edo, edere, edi, esus") {
                                return "edas";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fias";
                            }
                    }
                },
                level: [2, 5]
            }, {
                name: "third-person singular present active subjunctive",
                task: "Give the third-person singular present active subjunctive.",
                answer: verb => {
                    if (verb.identity.startsWith("memini")) return "meminerit";
                    if (verb.identity.startsWith("odi")) return "oderit";
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "et";
                        case 2:
                            return verb.present + "eat";
                        case 3:
                            return verb.present + "at";
                        case 3.5:
                            return verb.present + "iat";
                        case 4:
                            return verb.present + "iat";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "ferat";
                            } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                                return verb.present + "eat";
                            } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                                return verb.present + "sit";
                            } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                                return verb.present + "velit";
                            } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                                return verb.present + "nolit";
                            } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                                return verb.present + "malit";
                            } else if (verb.identity.split(", ")[0].endsWith("for")) {
                                return "fatur";
                            } else if (verb.identity == "edo, edere, edi, esus") {
                                return "edat";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiat";
                            }
                    }
                },
                level: [2, 5]
            }, {
                name: "first-person plural present active subjunctive",
                task: "Give the first-person plural present active subjunctive.",
                answer: verb => {
                    if (verb.identity.startsWith("memini")) return "meminerimus";
                    if (verb.identity.startsWith("odi")) return "oderimus";
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "emus";
                        case 2:
                            return verb.present + "eamus";
                        case 3:
                            return verb.present + "amus";
                        case 3.5:
                            return verb.present + "iamus";
                        case 4:
                            return verb.present + "iamus";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "feramus";
                            } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                                return verb.present + "eamus";
                            } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                                return verb.present + "simus";
                            } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                                return verb.present + "velimus";
                            } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                                return verb.present + "nolimus";
                            } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                                return verb.present + "malimus";
                            } else if (verb.identity.split(", ")[0].endsWith("for")) {
                                return "famur";
                            } else if (verb.identity == "edo, edere, edi, esus") {
                                return "edamus";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiamus";
                            }
                    }
                },
                level: [2, 5]
            }, {
                name: "second-person plural present active subjunctive",
                task: "Give the second-person plural present active subjunctive.",
                answer: verb => {
                    if (verb.identity.startsWith("memini")) return "memineritis";
                    if (verb.identity.startsWith("odi")) return "oderitis";
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "etis";
                        case 2:
                            return verb.present + "eatis";
                        case 3:
                            return verb.present + "atis";
                        case 3.5:
                            return verb.present + "iatis";
                        case 4:
                            return verb.present + "iatis";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "feratis";
                            } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                                return verb.present + "eatis";
                            } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                                return verb.present + "sitis";
                            } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                                return verb.present + "velitis";
                            } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                                return verb.present + "nolitis";
                            } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                                return verb.present + "malitis";
                            } else if (verb.identity.split(", ")[0].endsWith("for")) {
                                return "famini";
                            } else if (verb.identity == "edo, edere, edi, esus") {
                                return "edatis";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiatis";
                            }
                    }
                },
                level: [2, 5]
            }, {
                name: "third-person plural present active subjunctive",
                task: "Give the third-person plural present active subjunctive.",
                answer: verb => {
                    if (verb.identity.startsWith("memini")) return "meminerint";
                    if (verb.identity.startsWith("odi")) return "oderint";
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "ent";
                        case 2:
                            return verb.present + "eant";
                        case 3:
                            return verb.present + "ant";
                        case 3.5:
                            return verb.present + "iant";
                        case 4:
                            return verb.present + "iant";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "ferant";
                            } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                                return verb.present + "eant";
                            } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                                return verb.present + "sint";
                            } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                                return verb.present + "velint";
                            } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                                return verb.present + "nolint";
                            } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                                return verb.present + "malint";
                            } else if (verb.identity.split(", ")[0].endsWith("for")) {
                                return "fantur";
                            } else if (verb.identity == "edo, edere, edi, esus") {
                                return "edant";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiant";
                            }
                    }
                },
                level: [2, 5]
            }, {
                // IMPERFECT ACTIVE SUBJUNCTIVE
                name: "first-person singular imperfect active subjunctive",
                task: "Give the first-person singular imperfect active subjunctive.",
                answer: verb => {
                    return verb.identity.split(", ")[1] + "m";
                },
                level: [2.5, 5]
            }, {
                name: "second-person singular imperfect active subjunctive",
                task: "Give the second-person singular imperfect active subjunctive.",
                answer: verb => {
                    return verb.identity.split(", ")[1] + "s";
                },
                level: [2.5, 5]
            }, {
                name: "third-person singular imperfect active subjunctive",
                task: "Give the third-person singular imperfect active subjunctive.",
                answer: verb => {
                    return verb.identity.split(", ")[1] + "t";
                },
                level: [2.5, 5]
            }, {
                name: "first-person plural imperfect active subjunctive",
                task: "Give the first-person plural imperfect active subjunctive.",
                answer: verb => {
                    return verb.identity.split(", ")[1] + "mus";
                },
                level: [2.5, 5]
            }, {
                name: "second-person plural imperfect active subjunctive",
                task: "Give the second-person plural imperfect active subjunctive.",
                answer: verb => {
                    return verb.identity.split(", ")[1] + "tis";
                },
                level: [2.5, 5]
            }, {
                name: "third-person plural imperfect active subjunctive",
                task: "Give the third-person plural imperfect active subjunctive.",
                answer: verb => {
                    return verb.identity.split(", ")[1] + "nt";
                },
                level: [2.5, 5]
            }, {
                // PERFECT ACTIVE SUBJUNCTIVE
                name: "first-person singular perfect active subjunctive",
                task: "Give the first-person singular perfect active subjunctive.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "us sim";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "erim";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.present + "ierim";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.present + "fuerim";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.present + "voluerim";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.present + "noluerim";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.present + "maluerim";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fatus sim";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return "ederim";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.present + "factus sim";
                        }
                    } else {
                        return verb.perfect + "erim";
                    }
                },
                level: [2.5, 5]
            }, {
                name: "second-person singular perfect active subjunctive",
                task: "Give the second-person singular perfect active subjunctive.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "us sis";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "eris";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.present + "ieris";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.present + "fueris";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.present + "volueris";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.present + "nolueris";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.present + "malueris";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fatus sis";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return "ederis";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.present + "factus sis";
                        }
                    } else {
                        return verb.perfect + "eris";
                    }
                },
                level: [2.5, 5]
            }, {
                name: "third-person singular perfect active subjunctive",
                task: "Give the third-person singular perfect active subjunctive.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "us sit";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "erit";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.present + "ierit";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.present + "fuerit";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.present + "voluerit";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.present + "noluerit";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.present + "maluerit";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fatus sit";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return "ederit";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.present + "factus sit";
                        }
                    } else {
                        return verb.perfect + "erit";
                    }
                },
                level: [2.5, 5]
            }, {
                name: "first-person plural perfect active subjunctive",
                task: "Give the first-person plural perfect active subjunctive.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "i simus";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "erimus";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.present + "ierimus";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.present + "fuerimus";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.present + "voluerimus";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.present + "noluerimus";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.present + "maluerimus";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fati simus";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return "ederimus";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.present + "facti simus";
                        }
                    } else {
                        return verb.perfect + "erimus";
                    }
                },
                level: [2.5, 5]
            }, {
                name: "second-person plural perfect active subjunctive",
                task: "Give the second-person plural perfect active subjunctive.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "i sitis";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "eritis";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.present + "ieritis";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.present + "fueritis";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.present + "volueritis";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.present + "nolueritis";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.present + "malueritis";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fati sitis";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return "ederitis";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.present + "facti sitis";
                        }
                    } else {
                        return verb.perfect + "eritis";
                    }
                },
                level: [2.5, 5]
            }, {
                name: "third-person plural perfect active subjunctive",
                task: "Give the third-person plural perfect active subjunctive.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "i sint";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "erint";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.present + "ierint";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.present + "fuerint";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.present + "voluerint";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.present + "noluerint";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.present + "maluerint";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fati sint";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return "ederint";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.present + "facti sint";
                        }
                    } else {
                        return verb.perfect + "erint";
                    }
                },
                level: [2.5, 5]
            }, {
                // PLUPERFECT ACTIVE SUBJUNCTIVE
                name: "first-person singular pluperfect active subjunctive",
                task: "Give the first-person singular pluperfect active subjunctive.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "us essem";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "issem";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.present + "issem";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.present + "fuissem";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.present + "voluissem";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.present + "noluissem";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.present + "maluissem";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fatus essem";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return "edissem";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.present + "factus essem";
                        }
                    } else {
                        return verb.perfect + "issem";
                    }
                },
                level: [3, 5]
            }, {
                name: "second-person singular pluperfect active subjunctive",
                task: "Give the second-person singular pluperfect active subjunctive.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "us esses";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "isses";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.present + "isses";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.present + "fuisses";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.present + "voluisses";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.present + "noluisses";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.present + "maluisses";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fatus esses";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return "edisses";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.present + "factus esses";
                        }
                    } else {
                        return verb.perfect + "isses";
                    }
                },
                level: [3, 5]
            }, {
                name: "third-person singular pluperfect active subjunctive",
                task: "Give the third-person singular pluperfect active subjunctive.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "us esset";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "isset";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.present + "isset";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.present + "fuisset";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.present + "voluisset";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.present + "noluisset";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.present + "maluisset";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fatus esset";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return "edisset";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.present + "factus esset";
                        }
                    } else {
                        return verb.perfect + "isset";
                    }
                },
                level: [3, 5]
            }, {
                name: "first-person plural pluperfect active subjunctive",
                task: "Give the first-person plural pluperfect active subjunctive.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "i essemus";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "issemus";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.present + "issemus";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.present + "fuissemus";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.present + "voluissemus";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.present + "noluissemus";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.present + "maluissemus";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fati essemus";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return "edissemus";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.present + "facti essemus";
                        }
                    } else {
                        return verb.perfect + "issemus";
                    }
                },
                level: [3, 5]
            }, {
                name: "second-person plural pluperfect active subjunctive",
                task: "Give the second-person plural pluperfect active subjunctive.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "i essetis";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "issetis";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.present + "issetis";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.present + "fuissetis";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.present + "voluissetis";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.present + "noluissetis";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.present + "maluissetis";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fati essetis";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return "edissetis";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.present + "facti essetis";
                        }
                    } else {
                        return verb.perfect + "issetis";
                    }
                },
                level: [3, 5]
            }, {
                name: "third-person plural pluperfect active subjunctive",
                task: "Give the third-person plural pluperfect active subjunctive.",
                answer: verb => {
                    if (verb.transitive == 4) return verb.supine + "i essent";
                    if (verb.conjugation == 0) {
                        if (verb.identity.split(", ")[0].endsWith("fero")) {
                            return verb.perfect + "issent";
                        } else if (verb.identity.split(", ")[0].endsWith("eo")) {
                            return verb.present + "issent";
                        } else if (verb.identity.split(", ")[0].endsWith("sum")) {
                            return verb.present + "fuissent";
                        } else if (verb.identity.split(", ")[0].endsWith("volo")) {
                            return verb.present + "voluissent";
                        } else if (verb.identity.split(", ")[0].endsWith("nolo")) {
                            return verb.present + "noluissent";
                        } else if (verb.identity.split(", ")[0].endsWith("malo")) {
                            return verb.present + "maluissent";
                        } else if (verb.identity.split(", ")[0].endsWith("for")) {
                            return "fati essent";
                        } else if (verb.identity == "edo, edere, edi, esus") {
                            return "edissent";
                        } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                            return verb.present + "facti essent";
                        }
                    } else {
                        return verb.perfect + "issent";
                    }
                },
                level: [3, 5]
            }, {
                // PRESENT PASSIVE INDICATIVE
                name: "first-person singular present passive indicative",
                task: "Give the first-person singular present passive indicative.",
                answer: verb => {
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "or";
                        case 2:
                            return verb.present + "eor";
                        case 3:
                            return verb.present + "or";
                        case 3.5:
                            return verb.present + "ior";
                        case 4:
                            return verb.present + "ior";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "feror";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fio";
                            }
                    }
                },
                level: [2, 5]
            }, {
                name: "second-person singular present passive indicative",
                task: "Give the second-person singular present passive indicative.",
                answer: verb => {
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "aris";
                        case 2:
                            return verb.present + "eris";
                        case 3:
                            return verb.present + "eris";
                        case 3.5:
                            return verb.present + "eris";
                        case 4:
                            return verb.present + "iris";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "ferris";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fis";
                            }
                    }
                },
                level: [2, 5]
            }, {
                name: "third-person singular present passive indicative",
                task: "Give the third-person singular present passive indicative.",
                answer: verb => {
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "atur";
                        case 2:
                            return verb.present + "etur";
                        case 3:
                            return verb.present + "itur";
                        case 3.5:
                            return verb.present + "itur";
                        case 4:
                            return verb.present + "itur";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "fertur";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fit";
                            }
                    }
                },
                level: [2, 5]
            }, {
                name: "first-person plural present passive indicative",
                task: "Give the first-person plural present passive indicative.",
                answer: verb => {
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "amur";
                        case 2:
                            return verb.present + "emur";
                        case 3:
                            return verb.present + "imur";
                        case 3.5:
                            return verb.present + "imur";
                        case 4:
                            return verb.present + "imur";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "ferimur";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fimus";
                            }
                    }
                },
                level: [2, 5]
            }, {
                name: "second-person plural present passive indicative",
                task: "Give the second-person plural present passive indicative.",
                answer: verb => {
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "amini";
                        case 2:
                            return verb.present + "emini";
                        case 3:
                            return verb.present + "imini";
                        case 3.5:
                            return verb.present + "imini";
                        case 4:
                            return verb.present + "imini";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "ferimini";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fitis";
                            }
                    }
                },
                level: [2, 5]
            }, {
                name: "third-person plural present passive indicative",
                task: "Give the third-person plural present passive indicative.",
                answer: verb => {
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "antur";
                        case 2:
                            return verb.present + "entur";
                        case 3:
                            return verb.present + "untur";
                        case 3.5:
                            return verb.present + "iuntur";
                        case 4:
                            return verb.present + "iuntur";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "feruntur";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiunt";
                            }
                    }
                },
                level: [2, 5]
            }, {
                // IMPERFECT PASSIVE INDICATIVE
                name: "first-person singular imperfect passive indicative",
                task: "Give the first-person singular imperfect passive indicative.",
                answer: verb => {
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "abar";
                        case 2:
                            return verb.present + "ebar";
                        case 3:
                            return verb.present + "ebar";
                        case 3.5:
                            return verb.present + "iebar";
                        case 4:
                            return verb.present + "iebar";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "ferebar";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiebam";
                            }
                    }
                },
                level: [2, 5]
            }, {
                name: "second-person singular imperfect passive indicative",
                task: "Give the second-person singular imperfect passive indicative.",
                answer: verb => {
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "abaris";
                        case 2:
                            return verb.present + "ebaris";
                        case 3:
                            return verb.present + "ebaris";
                        case 3.5:
                            return verb.present + "iebaris";
                        case 4:
                            return verb.present + "iebaris";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "ferebaris";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiebas";
                            }
                    }
                },
                level: [2, 5]
            }, {
                name: "third-person singular imperfect passive indicative",
                task: "Give the third-person singular imperfect passive indicative.",
                answer: verb => {
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "abatur";
                        case 2:
                            return verb.present + "ebatur";
                        case 3:
                            return verb.present + "ebatur";
                        case 3.5:
                            return verb.present + "iebatur";
                        case 4:
                            return verb.present + "iebatur";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "ferebatur";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiebat";
                            }
                    }
                },
                level: [2, 5]
            }, {
                name: "first-person plural imperfect passive indicative",
                task: "Give the first-person plural imperfect passive indicative.",
                answer: verb => {
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "abamur";
                        case 2:
                            return verb.present + "ebamur";
                        case 3:
                            return verb.present + "ebamur";
                        case 3.5:
                            return verb.present + "iebamur";
                        case 4:
                            return verb.present + "iebamur";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "ferebamur";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiebamus";
                            }
                    }
                },
                level: [2, 5]
            }, {
                name: "second-person plural imperfect passive indicative",
                task: "Give the second-person plural imperfect passive indicative.",
                answer: verb => {
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "abamini";
                        case 2:
                            return verb.present + "ebamini";
                        case 3:
                            return verb.present + "ebamini";
                        case 3.5:
                            return verb.present + "iebamini";
                        case 4:
                            return verb.present + "iebamini";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "ferebamini";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiebatis";
                            }
                    }
                },
                level: [2, 5]
            }, {
                name: "third-person plural imperfect passive indicative",
                task: "Give the third-person plural imperfect passive indicative.",
                answer: verb => {
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "abantur";
                        case 2:
                            return verb.present + "ebantur";
                        case 3:
                            return verb.present + "ebantur";
                        case 3.5:
                            return verb.present + "iebantur";
                        case 4:
                            return verb.present + "iebantur";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "ferebantur";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiebant";
                            }
                    }
                },
                level: [2, 5]
            }, {
                // FUTURE PASSIVE INDICATIVE
                name: "first-person singular future passive indicative",
                task: "Give the first-person singular future passive indicative.",
                answer: verb => {
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "abor";
                        case 2:
                            return verb.present + "ebor";
                        case 3:
                            return verb.present + "ar";
                        case 3.5:
                            return verb.present + "iar";
                        case 4:
                            return verb.present + "iar";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "ferar";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiam";
                            }
                    }
                },
                level: [2, 5]
            }, {
                name: "second-person singular future passive indicative",
                task: "Give the second-person singular future passive indicative.",
                answer: verb => {
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "aberis";
                        case 2:
                            return verb.present + "eberis";
                        case 3:
                            return verb.present + "eris";
                        case 3.5:
                            return verb.present + "ieris";
                        case 4:
                            return verb.present + "ieris";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "fereris";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fies";
                            }
                    }
                },
                level: [2, 5]
            }, {
                name: "third-person singular future passive indicative",
                task: "Give the third-person singular future passive indicative.",
                answer: verb => {
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "abitur";
                        case 2:
                            return verb.present + "ebitur";
                        case 3:
                            return verb.present + "etur";
                        case 3.5:
                            return verb.present + "ietur";
                        case 4:
                            return verb.present + "ietur";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "feretur";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiet";
                            }
                    }
                },
                level: [2, 5]
            }, {
                name: "first-person plural future passive indicative",
                task: "Give the first-person plural future passive indicative.",
                answer: verb => {
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "abimur";
                        case 2:
                            return verb.present + "ebimur";
                        case 3:
                            return verb.present + "emur";
                        case 3.5:
                            return verb.present + "iemur";
                        case 4:
                            return verb.present + "iemur";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "feremur";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiemus";
                            }
                    }
                },
                level: [2, 5]
            }, {
                name: "second-person plural future passive indicative",
                task: "Give the second-person plural future passive indicative.",
                answer: verb => {
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "abimini";
                        case 2:
                            return verb.present + "ebimini";
                        case 3:
                            return verb.present + "emini";
                        case 3.5:
                            return verb.present + "iemini";
                        case 4:
                            return verb.present + "iemini";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "feremini";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fietis";
                            }
                    }
                },
                level: [2, 5]
            }, {
                name: "third-person plural future passive indicative",
                task: "Give the third-person plural future passive indicative.",
                answer: verb => {
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "abuntur";
                        case 2:
                            return verb.present + "ebuntur";
                        case 3:
                            return verb.present + "entur";
                        case 3.5:
                            return verb.present + "ientur";
                        case 4:
                            return verb.present + "ientur";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "ferentur";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fient";
                            }
                    }
                },
                level: [2, 5]
            }, {
                // PRESENT PASSIVE SUBJUNCTIVE
                name: "first-person singular present passive subjunctive",
                task: "Give the first-person singular present passive subjunctive.",
                answer: verb => {
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "er";
                        case 2:
                            return verb.present + "ear";
                        case 3:
                            return verb.present + "ar";
                        case 3.5:
                            return verb.present + "iar";
                        case 4:
                            return verb.present + "iar";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "ferar";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiam";
                            }
                    }
                },
                level: [2.5, 5]
            }, {
                name: "second-person singular present passive subjunctive",
                task: "Give the second-person singular present passive subjunctive.",
                answer: verb => {
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "eris";
                        case 2:
                            return verb.present + "earis";
                        case 3:
                            return verb.present + "aris";
                        case 3.5:
                            return verb.present + "iaris";
                        case 4:
                            return verb.present + "iaris";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "feraris";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fias";
                            }
                    }
                },
                level: [2.5, 5]
            }, {
                name: "third-person singular present passive subjunctive",
                task: "Give the third-person singular present passive subjunctive.",
                answer: verb => {
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "etur";
                        case 2:
                            return verb.present + "eatur";
                        case 3:
                            return verb.present + "atur";
                        case 3.5:
                            return verb.present + "iatur";
                        case 4:
                            return verb.present + "iatur";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "feratur";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiat";
                            }
                    }
                },
                level: [2.5, 5]
            }, {
                name: "first-person plural present passive subjunctive",
                task: "Give the first-person plural present passive subjunctive.",
                answer: verb => {
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "emur";
                        case 2:
                            return verb.present + "eamur";
                        case 3:
                            return verb.present + "amur";
                        case 3.5:
                            return verb.present + "iamur";
                        case 4:
                            return verb.present + "iamur";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "feramur";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiamus";
                            }
                    }
                },
                level: [2.5, 5]
            }, {
                name: "second-person plural present passive subjunctive",
                task: "Give the second-person plural present passive subjunctive.",
                answer: verb => {
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "emini";
                        case 2:
                            return verb.present + "eamini";
                        case 3:
                            return verb.present + "amini";
                        case 3.5:
                            return verb.present + "iamini";
                        case 4:
                            return verb.present + "iamini";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "feramini";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiatis";
                            }
                    }
                },
                level: [2.5, 5]
            }, {
                name: "third-person plural present passive subjunctive",
                task: "Give the third-person plural present passive subjunctive.",
                answer: verb => {
                    switch (verb.conjugation) {
                        case 1:
                            return verb.present + "entur";
                        case 2:
                            return verb.present + "eantur";
                        case 3:
                            return verb.present + "antur";
                        case 3.5:
                            return verb.present + "iantur";
                        case 4:
                            return verb.present + "iantur";
                        case 0:
                            if (verb.identity.split(", ")[0].endsWith("fero")) {
                                return verb.present + "ferantur";
                            } else if (verb.identity.split(", ")[0].endsWith("fio")) {
                                return verb.present + "fiant";
                            }
                    }
                },
                level: [2.5, 5]
            }, {
                // IMPERFECT PASSIVE SUBJUNCTIVE
                name: "first-person singular imperfect passive subjunctive",
                task: "Give the first-person singular imperfect passive subjunctive.",
                answer: verb => {
                    return verb.identity.split(", ")[1] + "r";
                },
                level: [3, 5]
            }, {
                name: "second-person singular imperfect passive subjunctive",
                task: "Give the second-person singular imperfect passive subjunctive.",
                answer: verb => {
                    return verb.identity.split(", ")[1] + "ris";
                },
                level: [3, 5]
            }, {
                name: "third-person singular imperfect passive subjunctive",
                task: "Give the third-person singular imperfect passive subjunctive.",
                answer: verb => {
                    return verb.identity.split(", ")[1] + "tur";
                },
                level: [3, 5]
            }, {
                name: "first-person plural imperfect passive subjunctive",
                task: "Give the first-person plural imperfect passive subjunctive.",
                answer: verb => {
                    return verb.identity.split(", ")[1] + "mur";
                },
                level: [3, 5]
            }, {
                name: "second-person plural imperfect passive subjunctive",
                task: "Give the second-person plural imperfect passive subjunctive.",
                answer: verb => {
                    return verb.identity.split(", ")[1] + "mini";
                },
                level: [3, 5]
            }, {
                name: "third-person plural imperfect passive subjunctive",
                task: "Give the third-person plural imperfect passive subjunctive.",
                answer: verb => {
                    return verb.identity.split(", ")[1] + "ntur";
                },
                level: [3, 5]
            }, {
                // PERFECT PASSIVE INDICATIVE
                name: "first-person singular perfect passive indicative",
                task: "Give the first-person singular perfect passive indicative.",
                answer: verb => {
                    let ppp = verb.supine + "us";
                    return ppp + " sum";
                },
                level: [2, 5]
            }, {
                name: "second-person singular perfect passive indicative",
                task: "Give the second-person singular perfect passive indicative.",
                answer: verb => {
                    let ppp = verb.supine + "us";
                    return ppp + " es";
                },
                level: [2, 5]
            }, {
                name: "third-person singular perfect passive indicative",
                task: "Give the third-person singular perfect passive indicative.",
                answer: verb => {
                    let ppp = verb.supine + "us";
                    return ppp + " est";
                },
                level: [2, 5]
            }, {
                name: "first-person plural perfect passive indicative",
                task: "Give the first-person plural perfect passive indicative.",
                answer: verb => {
                    let ppp = verb.supine + "i";
                    return ppp + " sumus";
                },
                level: [2, 5]
            }, {
                name: "second-person plural perfect passive indicative",
                task: "Give the second-person plural perfect passive indicative.",
                answer: verb => {
                    let ppp = verb.supine + "i";
                    return ppp + " estis";
                },
                level: [2, 5]
            }, {
                name: "third-person plural perfect passive indicative",
                task: "Give the third-person plural perfect passive indicative.",
                answer: verb => {
                    let ppp = verb.supine + "i";
                    return ppp + " sunt";
                },
                level: [2, 5]
            }, {
                // PLUPERFECT PASSIVE INDICATIVE
                name: "first-person singular pluperfect passive indicative",
                task: "Give the first-person singular pluperfect passive indicative.",
                answer: verb => {
                    let ppp = verb.supine + "us";
                    return ppp + " eram";
                },
                level: [2.5, 5]
            }, {
                name: "second-person singular pluperfect passive indicative",
                task: "Give the second-person singular pluperfect passive indicative.",
                answer: verb => {
                    let ppp = verb.supine + "us";
                    return ppp + " eras";
                },
                level: [2.5, 5]
            }, {
                name: "third-person singular pluperfect passive indicative",
                task: "Give the third-person singular pluperfect passive indicative.",
                answer: verb => {
                    let ppp = verb.supine + "us";
                    return ppp + " erat";
                },
                level: [2.5, 5]
            }, {
                name: "first-person plural pluperfect passive indicative",
                task: "Give the first-person plural pluperfect passive indicative.",
                answer: verb => {
                    let ppp = verb.supine + "i";
                    return ppp + " eramus";
                },
                level: [2.5, 5]
            }, {
                name: "second-person plural pluperfect passive indicative",
                task: "Give the second-person plural pluperfect passive indicative.",
                answer: verb => {
                    let ppp = verb.supine + "i";
                    return ppp + " eratis";
                },
                level: [2.5, 5]
            }, {
                name: "third-person plural pluperfect passive indicative",
                task: "Give the third-person plural pluperfect passive indicative.",
                answer: verb => {
                    let ppp = verb.supine + "i";
                    return ppp + " erant";
                },
                level: [2.5, 5]
            }, {
                // FUTURE PERFECT PASSIVE INDICATIVE
                name: "first-person singular future perfect passive indicative",
                task: "Give the first-person singular future perfect passive indicative.",
                answer: verb => {
                    let ppp = verb.supine + "us";
                    return ppp + " ero";
                },
                level: [2.5, 5]
            }, {
                name: "second-person singular future perfect passive indicative",
                task: "Give the second-person singular future perfect passive indicative.",
                answer: verb => {
                    let ppp = verb.supine + "us";
                    return ppp + " eris";
                },
                level: [2.5, 5]
            }, {
                name: "third-person singular future perfect passive indicative",
                task: "Give the third-person singular future perfect passive indicative.",
                answer: verb => {
                    let ppp = verb.supine + "us";
                    return ppp + " erit";
                },
                level: [2.5, 5]
            }, {
                name: "first-person plural future perfect passive indicative",
                task: "Give the first-person plural future perfect passive indicative.",
                answer: verb => {
                    let ppp = verb.supine + "i";
                    return ppp + " erimus";
                },
                level: [2.5, 5]
            }, {
                name: "second-person plural future perfect passive indicative",
                task: "Give the second-person plural future perfect passive indicative.",
                answer: verb => {
                    let ppp = verb.supine + "i";
                    return ppp + " eritis";
                },
                level: [2.5, 5]
            }, {
                name: "third-person plural future perfect passive indicative",
                task: "Give the third-person plural future perfect passive indicative.",
                answer: verb => {
                    let ppp = verb.supine + "i";
                    return ppp + " erunt";
                },
                level: [2.5, 5]
            }, {
                // PERFECT PASSIVE SUBJUNCTIVE
                name: "first-person singular perfect passive subjunctive",
                task: "Give the first-person singular perfect passive subjunctive.",
                answer: verb => {
                    let ppp = verb.supine + "us";
                    return ppp + " sim";
                },
                level: [3, 5]
            }, {
                name: "second-person singular perfect passive subjunctive",
                task: "Give the second-person singular perfect passive subjunctive.",
                answer: verb => {
                    let ppp = verb.supine + "us";
                    return ppp + " sis";
                },
                level: [3, 5]
            }, {
                name: "third-person singular perfect passive subjunctive",
                task: "Give the third-person singular perfect passive subjunctive.",
                answer: verb => {
                    let ppp = verb.supine + "us";
                    return ppp + " sit";
                },
                level: [3, 5]
            }, {
                name: "first-person plural perfect passive subjunctive",
                task: "Give the first-person plural perfect passive subjunctive.",
                answer: verb => {
                    let ppp = verb.supine + "i";
                    return ppp + " simus";
                },
                level: [3, 5]
            }, {
                name: "second-person plural perfect passive subjunctive",
                task: "Give the second-person plural perfect passive subjunctive.",
                answer: verb => {
                    let ppp = verb.supine + "i";
                    return ppp + " sitis";
                },
                level: [3, 5]
            }, {
                name: "third-person plural perfect passive subjunctive",
                task: "Give the third-person plural perfect passive subjunctive.",
                answer: verb => {
                    let ppp = verb.supine + "i";
                    return ppp + " sint";
                },
                level: [3, 5]
            }, {
                // PLUPERFECT PASSIVE SUBJUNCTIVE
                name: "first-person singular pluperfect passive subjunctive",
                task: "Give the first-person singular pluperfect passive subjunctive.",
                answer: verb => {
                    let ppp = verb.supine + "us";
                    return ppp + " essem";
                },
                level: [3.5, 5]
            }, {
                name: "second-person singular pluperfect passive subjunctive",
                task: "Give the second-person singular pluperfect passive subjunctive.",
                answer: verb => {
                    let ppp = verb.supine + "us";
                    return ppp + " esses";
                },
                level: [3.5, 5]
            }, {
                name: "third-person singular pluperfect passive subjunctive",
                task: "Give the third-person singular pluperfect passive subjunctive.",
                answer: verb => {
                    let ppp = verb.supine + "us";
                    return ppp + " esset";
                },
                level: [3.5, 5]
            }, {
                name: "first-person plural pluperfect passive subjunctive",
                task: "Give the first-person plural pluperfect passive subjunctive.",
                answer: verb => {
                    let ppp = verb.supine + "i";
                    return ppp + " essemus";
                },
                level: [3.5, 5]
            }, {
                name: "second-person plural pluperfect passive subjunctive",
                task: "Give the second-person plural pluperfect passive subjunctive.",
                answer: verb => {
                    let ppp = verb.supine + "i";
                    return ppp + " essetis";
                },
                level: [3.5, 5]
            }, {
                name: "third-person plural pluperfect passive subjunctive",
                task: "Give the third-person plural pluperfect passive subjunctive.",
                answer: verb => {
                    let ppp = verb.supine + "i";
                    return ppp + " essent";
                },
                level: [3.5, 5]
            }, {
                // PRESENT ACTIVE INFINITIVE
                name: "present active infinitive",
                task: "Give the present active infinitive.",
                answer: verb => {
                    return verb.identity.split(", ")[1];
                },
                level: [0, 5]
            }, {
                // PRESENT PASSIVE INFINITIVE
                name: "present passive infinitive",
                task: "Give the present passive infinitive.",
                answer: verb => {
                    let inf = verb.identity.split(", ")[1];
                    if (inf.endsWith("ere")) return inf.substring(0, inf.length - 3) + "i";
                    return inf.substring(0, inf.length - 1) + "i";
                },
                level: [3.5, 5]
            }, {
                // PERFECT ACTIVE INFINITIVE
                name: "perfect active infinitive",
                task: "Give the perfect active infinitive.",
                answer: verb => {
                    return verb.perfect + "isse";
                },
                level: [2.5, 5]
            }, {
                // PERFECT PASSIVE INFINITIVE
                name: "perfect passive infinitive",
                task: "Give the perfect passive infinitive.",
                answer: verb => {
                    return verb.supine + "us esse";
                },
                level: [3, 5]
            }, {
                // FUTURE ACTIVE INFINITIVE
                name: "future active infinitive",
                task: "Give the future active infinitive.",
                answer: verb => {
                    if (verb.identity.startsWith("fio")) return "fore";
                    if (verb.supine !== "---") return verb.supine + "urus esse";
                    if (verb.perfect.endsWith("fu")) return verb.perfect.slice(0, -2) + "futurus esse";
                    return "";
                },
                level: [4, 5]
            }, {
                // FUTURE PASSIVE INFINITIVE
                name: "future passive infinitive",
                task: "Give the future passive infinitive.",
                answer: verb => {
                    return verb.supine + "um iri";
                },
                level: [4, 5]
            }
        ]
    }
};

let settings = {};

const predefined = {
    POS: {
        param: "pos",
        default: "verbs"
    },
    pitch: {
        param: "pitch",
        default: 1
    },
    rate: {
        param: "speed",
        default: 1
    },
    verbs: {
        param: "verbs",
        default: 1 // present active indicative
    },
    nouns: {
        param: "nouns",
        default: 5 // nominative and genitive singular
    },
    adjectives: {
        param: "adjectives",
        default: 5 // nominative and genitive singular
    },
    pronouns: {
        param: "pronouns",
        default: 1 // nominative singular
    },
    level: {
        param: "level",
        default: 1
    },
    month: {
        param: "month",
        default: 4
    },
    darkMode: {
        param: "dark",
        default: false
    }
};

// Function to load settings from localStorage
function loadSettings() {
    const params = new URLSearchParams(window.location.search);
    const hasUrlParams = Array.from(params.keys()).some(key =>
        Object.values(predefined).some(p => p.param === key)
    );

    // If URL parameters exist, use them and save to localStorage (migration)
    if (hasUrlParams) {
        for (let key in predefined) {
            if (params.has(predefined[key].param)) {
                settings[key] = params.get(predefined[key].param);
            } else {
                settings[key] = predefined[key].default;
            }
        }
        // Save to localStorage for future use
        saveSettings();
    } else {
        // Load from localStorage or use defaults
        const stored = localStorage.getItem('celeriusSettings');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                for (let key in predefined) {
                    settings[key] = parsed[key] !== undefined ? parsed[key] : predefined[key].default;
                }
            } catch (e) {
                console.error('Error parsing settings:', e);
                // Use defaults if parsing fails
                for (let key in predefined) {
                    settings[key] = predefined[key].default;
                }
            }
        } else {
            // No stored settings, use defaults
            for (let key in predefined) {
                settings[key] = predefined[key].default;
            }
        }
    }

    // Convert BigInt strings back to BigInt
    settings.verbs = BigInt(settings.verbs);
    settings.nouns = BigInt(settings.nouns);
    settings.adjectives = BigInt(settings.adjectives);
    settings.pronouns = BigInt(settings.pronouns);

    // Convert darkMode to boolean
    settings.darkMode = settings.darkMode === true || settings.darkMode === 'true';
}

// Function to save settings to localStorage
function saveSettings() {
    try {
        // Convert BigInts to strings for JSON serialization
        const toSave = {
            ...settings,
            verbs: settings.verbs.toString(),
            nouns: settings.nouns.toString(),
            adjectives: settings.adjectives.toString(),
            pronouns: settings.pronouns.toString()
        };
        localStorage.setItem('celeriusSettings', JSON.stringify(toSave));
    } catch (e) {
        console.error('Error saving settings:', e);
    }
}

// Function to apply theme
function applyTheme() {
    if (settings.darkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
}

// Load settings on page load
loadSettings();
applyTheme();


// presets[level][month] need not always exist for a given month (leading to a disabled checkbox),
// but when it does exist, it is an object of BigInts
let presets = [{}, {
    4: {
        verbs: 1073741825n,
        nouns: 0n,
        adjectives: 0n,
        pronouns: 0n
    }, 8: {
        verbs: 3221225493n,
        nouns: 0n,
        adjectives: 0n,
        pronouns: 0n
    }
}, {
    4: {
        verbs: 3222274133n,
        nouns: 0n,
        adjectives: 0n,
        pronouns: 0n
    }, 8: {
        verbs: 3423600725n,
        nouns: 0n,
        adjectives: 0n,
        pronouns: 0n
    }
}, {
    4: {
        verbs: 4229234943n,
        nouns: 0n,
        adjectives: 0n,
        pronouns: 0n
    }, 8: {
        verbs: 4235550719n,
        nouns: 0n,
        adjectives: 0n,
        pronouns: 0n
    }
}, {
    4: {
        verbs: 8796093022207n,
        nouns: 16383n,
        adjectives: 16383n,
        pronouns: 4095n
    }, 8: {
        verbs: 8796093022207n,
        nouns: 16383n,
        adjectives: 16383n,
        pronouns: 4095n
    }
}, {
    4: {
        verbs: 8796093022207n,
        nouns: 16383n,
        adjectives: 16383n,
        pronouns: 4095n
    }, 8: {
        verbs: 8796093022207n,
        nouns: 16383n,
        adjectives: 16383n,
        pronouns: 4095n
    }
}
];

level.value = settings.level;
let months = document.querySelectorAll("[name='months']");

function updateboxes() {
    verbboxes.forEach(verbbox => {
        verbbox.checked = settings.verbs & (1n << BigInt(verbbox.dataset.value));
        if (verbbox.id == "firstgerundivesverbbox") secondgerundivesverbbox.checked = verbbox.checked;
    });

    nounboxes.forEach(nounbox => {
        nounbox.checked = settings.nouns & (1n << BigInt(nounbox.dataset.value));
    });

    adjectiveboxes.forEach(adjectivebox => {
        adjectivebox.checked = settings.adjectives & (1n << BigInt(adjectivebox.dataset.value));
    });

    pronounboxes.forEach(pronounbox => {
        pronounbox.checked = settings.pronouns & (1n << BigInt(pronounbox.dataset.value));
    });
}

function updatemonths() {
    for (let j = 1; j < 10; j++) {
        months[j - 1].checked = false;
        months[j - 1].disabled = !Object.keys(presets[settings.level]).includes(j.toString());
    }
    months[settings.month - 1].checked = true;
    updateboxes();
}

function updatesets() {
    settings.verbs = BigInt(presets[settings.level][settings.month].verbs);
    settings.nouns = BigInt(presets[settings.level][settings.month].nouns);
    settings.adjectives = BigInt(presets[settings.level][settings.month].adjectives);
    settings.pronouns = BigInt(presets[settings.level][settings.month].pronouns);
}

let verbforms = {};

['present active indicative', 'present passive indicative', 'perfect active indicative', 'perfect passive indicative', 'imperfect active indicative', 'imperfect passive indicative', 'pluperfect active indicative', 'pluperfect passive indicative', 'future active indicative', 'future passive indicative', 'future perfect active indicative', 'future perfect passive indicative', 'present active subjunctive', 'present passive subjunctive', 'perfect active subjunctive', 'perfect passive subjunctive', 'imperfect active subjunctive', 'imperfect passive subjunctive', 'pluperfect active subjunctive', 'pluperfect passive subjunctive'].forEach((ending, index) => {
    verbforms[1n << BigInt(index)] = ["first-person singular", "first-person plural", "second-person singular", "second-person plural", "third-person singular", "third-person plural"].map(prefix => prefix + " " + ending);
});

['present active infinitive', 'present passive infinitive', 'perfect active infinitive', 'perfect passive infinitive', 'future active infinitive', 'future passive infinitive'].forEach((ending, index) => {
    verbforms[1n << BigInt(index + 20)] = [ending];
});

['present active participle', 'perfect passive participle', 'future active participle', 'gerundive'].forEach((ending, index) => {
    verbforms[1n << BigInt(index + 26)] = [ending];
});

['second-person singular present active', 'second-person plural present active', 'second-person singular future active', 'third-person singular future active', 'second-person plural future active', 'third-person plural future active', 'second-person singular present passive', 'second-person plural present passive', 'second-person singular future passive', 'third-person singular future passive', 'third-person plural future passive'].forEach((ending, index) => {
    verbforms[1n << BigInt(index + 30)] = ["imperative " + ending];
});

['gerunds', 'supines'].forEach((ending, index) => {
    verbforms[1n << BigInt(index + 41)] = [ending];
});

let verbboxes = document.querySelectorAll(".verbbox");

for (let index = 0; index < 43; index++) {
    verbboxes[index].dataset.value = index;
    verbboxes[index].addEventListener("click", () => {
        settings.verbs = 0n;
        verbboxes.forEach(verbbox => {
            if (verbbox.checked) settings.verbs |= 1n << BigInt(verbbox.dataset.value);
        });

        months.forEach(e => {
            e.checked = false;
        });
        saveSettings();
    });
}

let nounforms = {};

['nominative', 'genitive', 'dative', 'accusative', 'ablative', 'vocative', 'locative'].forEach((ending, index) => {
    nounforms[1n << BigInt(2 * index)] = ending + " singular";
    nounforms[1n << BigInt(2 * index + 1)] = ending + " plural";
});

let nounboxes = document.querySelectorAll(".nounbox");

for (let index = 0; index < 14; index++) {
    nounboxes[index].dataset.value = index;
    nounboxes[index].addEventListener("click", () => {
        settings.nouns = 0n;
        nounboxes.forEach(nounbox => {
            if (nounbox.checked) settings.nouns |= 1n << BigInt(nounbox.dataset.value);
        });

        months.forEach(e => {
            e.checked = false;
        });
        saveSettings();
    });
}

let adjectiveforms = {};

['nominative', 'genitive', 'dative', 'accusative', 'ablative', 'vocative', 'locative'].forEach((ending, index) => {
    adjectiveforms[1n << BigInt(2 * index)] = ending + " singular";
    adjectiveforms[1n << BigInt(2 * index + 1)] = ending + " plural";
});

let adjectiveboxes = document.querySelectorAll(".adjectivebox");

for (let index = 0; index < 14; index++) {
    adjectiveboxes[index].dataset.value = index;
    adjectiveboxes[index].addEventListener("click", () => {
        settings.adjectives = 0n; // theoretically, this could be made faster by just XORing no matter what
        adjectiveboxes.forEach(adjectivebox => {
            if (adjectivebox.checked) settings.adjectives |= 1n << BigInt(adjectivebox.dataset.value);
        });

        months.forEach(e => {
            e.checked = false;
        });
        saveSettings();
    });
}

let pronounforms = {};

['nominative', 'genitive', 'dative', 'accusative', 'ablative', 'vocative', 'locative'].forEach((ending, index) => {
    pronounforms[1n << BigInt(2 * index)] = ending + " singular";
    pronounforms[1n << BigInt(2 * index + 1)] = ending + " plural";
});

let pronounboxes = document.querySelectorAll(".pronounbox");

for (let index = 0; index < 12; index++) {
    pronounboxes[index].dataset.value = index;
    pronounboxes[index].addEventListener("click", () => {
        settings.pronouns = 0n; // theoretically, this could be made faster by just XORing no matter what
        pronounboxes.forEach(pronounbox => {
            if (pronounbox.checked) settings.pronouns |= 1n << BigInt(pronounbox.dataset.value);
        });

        months.forEach(e => {
            e.checked = false;
        });
        saveSettings();
    });
}

updatesets();
updatemonths();

if (!["verbs", "nouns", "adjectives", "pronouns"].includes(settings.POS)) settings.POS = "verbs";

switch (settings.POS) {
    case "verbs":
        verbs.checked = true;
        updatePOS();
        verbs.scrollIntoView(); // what's this for?
        break;
    case "nouns":
        nouns.checked = true;
        updatePOS();
        nouns.scrollIntoView();
        break;
    case "adjectives":
        adjectives.checked = true;
        updatePOS();
        adjectives.scrollIntoView();
        break;
    case "pronouns":
        pronouns.checked = true;
        updatePOS();
        pronouns.scrollIntoView();
        break;
}
pitch.value = settings.pitch;
rate.value = settings.rate;

months.forEach((e, i) => {
    e.addEventListener("click", () => {
        settings.month = i + 1;
        updatesets();
        updateboxes();
        saveSettings();
    });
});

function updatePOS() {
    subverbs.style.display = "none";
    subnouns.style.display = "none";
    subadjectives.style.display = "none";
    subpronouns.style.display = "none";
    if (settings.level == 5) {
        easy.style.display = "none";
        if (settings.POS == "verbs") {
            subverbs.style.display = "block";
        } else if (settings.POS == "nouns") {
            subnouns.style.display = "block";
        } else if (settings.POS == "adjectives") {
            subadjectives.style.display = "block";
        } else if (settings.POS == "pronouns") {
            subpronouns.style.display = "block";
        }
    } else {
        easy.style.display = "block";
    }
}

verbs.addEventListener("click", event => {
    settings.POS = "verbs";
    updatePOS();
    saveSettings();
});

nouns.addEventListener("click", event => {
    settings.POS = "nouns";
    updatePOS();
    saveSettings();
});

adjectives.addEventListener("click", event => {
    settings.POS = "adjectives";
    updatePOS();
    saveSettings();
});

pronouns.addEventListener("click", event => {
    settings.POS = "pronouns";
    updatePOS();
    saveSettings();
});

pitch.addEventListener("input", event => {
    settings.pitch = pitch.value;
    saveSettings();
});

rate.addEventListener("input", event => {
    settings.rate = rate.value;
    saveSettings();
});

level.addEventListener("input", event => {
    settings.level = level.value;
    updatePOS();
    settings.month = 4;
    updatesets();
    updatemonths();
    saveSettings();
});

voice.addEventListener("input", event => {
    settings.voice = speechSynthesis.getVoices()[voice.value];
    saveSettings();
});

// Dark mode toggle handler
const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
    // Set initial state
    darkModeToggle.checked = settings.darkMode;

    // Add event listener
    darkModeToggle.addEventListener('change', () => {
        settings.darkMode = darkModeToggle.checked;
        applyTheme();
        saveSettings();
    });
}
// update the list of words instead of just using randomness?
// in particular, change the vocabulary difficulty, as well

function populateVoices() {
    const voices = speechSynthesis.getVoices();

    settings.voice = voices[0];

    for (let i = 0; i < voices.length; i++) {
        const option = document.createElement("option");
        option.textContent = `${voices[i].name} (${voices[i].lang})`;

        if (voices[i].default) {
            option.textContent += " — DEFAULT";
        }

        option.setAttribute("data-lang", voices[i].lang);
        option.setAttribute("data-name", voices[i].name);
        option.value = i;

        document.getElementById("voice").appendChild(option);
    }
}

populateVoices();
speechSynthesis.onvoiceschanged = () => {
    populateVoices();
};

let utterance;
let playing = false;
const advancer = document.getElementById("advancer");
const response = document.getElementById("response");

let answer;
let task;

let skippable = false;

function play() {
    response.value = "Loading...";

    skippable = true;

    advancer.innerHTML = "Loading...";
    advancer.disabled = true;
    advancer.style.backgroundColor = "#dd5c5c";
    response.style.display = "inline-block";
    response.style.color = "#dd5c5c";
    response.disabled = true;

    let word, machine;

    while (true) {
        word = words[settings.POS][Math.floor(Math.random() * words[settings.POS].length)];
        let names = tests[settings.POS](word);
        let testable = machines[settings.POS].tests.filter(test => names.includes(test.name));

        if (!testable.length) continue;

        machine = testable[Math.floor(Math.random() * testable.length)];

        if ((word.level <= settings.level) && (machine.level[0] <= settings.level && settings.level <= machine.level[1])) break;
    }

    main.innerHTML = "";

    for (let display of machines[settings.POS].display(word)) {
        if (display.wait == 0) {
            main.insertAdjacentHTML("beforeend", display.text);
        } else {
            setTimeout(() => {
                main.insertAdjacentHTML("beforeend", display.text);
            }, display.wait);
        }
    }

    if (speechSynthesis.paused) {
        speechSynthesis.resume();
    }

    task = machine.task;

    // Simplify instruction for Latin 1 & 2
    // Remove "active indicative", "indicative" (so passive remains), and "active" (so subjunctive remains)
    if (settings.level <= 2 && !task.toLowerCase().includes("imperative")) {
        task = task.replace(" active indicative", "").replace(" indicative", "").replace(" active", "");
    }

    speechSynthesis.cancel();
    utterance = new SpeechSynthesisUtterance(task);

    utterance.addEventListener("start", () => {
        response.disabled = false;
        response.value = "";
        response.focus();

        advancer.innerHTML = "Reveal";
        advancer.disabled = false;
    });

    utterance.pitch = settings.pitch;
    utterance.rate = settings.rate;

    utterance.voice = settings.voice;

    playing = true;

    speechSynthesis.speak(utterance);

    answer = machine.answer(word);
}

// Add this outside
if (response) {
    response.addEventListener("input", () => {
        speechSynthesis.cancel();
    });

    // Also allow Enter to submit
    response.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            stop(); // Reveal/Check
        }
    });
}

// Function to strip macrons from Latin text for answer comparison
function stripMacrons(text) {
    // Maps the replacement letter to a regex matching the macron and its HTML entities
    const macronMap = {
        'a': /ā|&#257;|&#[xX]0*101;|&amacr;/g,
        'e': /ē|&#275;|&#[xX]0*113;|&emacr;/g,
        'i': /ī|&#299;|&#[xX]0*12[bB];|&imacr;/g,
        'o': /ō|&#333;|&#[xX]0*14[dD];|&omacr;/g,
        'u': /ū|&#363;|&#[xX]0*16[bB];|&umacr;/g,
        'y': /ȳ|&#563;|&#[xX]0*233;/g,
        'A': /Ā|&#256;|&#[xX]0*100;|&Amacr;/g,
        'E': /Ē|&#274;|&#[xX]0*112;|&Emacr;/g,
        'I': /Ī|&#298;|&#[xX]0*12[aA];|&Imacr;/g,
        'O': /Ō|&#332;|&#[xX]0*14[cC];|&Omacr;/g,
        'U': /Ū|&#362;|&#[xX]0*16[aA];|&Umacr;/g,
        'Y': /Ȳ|&#562;|&#[xX]0*232;/g
    };

    let result = text;
    for (const [replacement, regex] of Object.entries(macronMap)) {
        result = result.replace(regex, replacement);
    }
    return result;
}

function stop(forceReveal = false) {
    if (playing) {
        speechSynthesis.cancel();
        playing = false;
    }

    // Normalize both user input and expected answer by stripping macrons
    const userAnswer = stripMacrons(response.value.trim());
    const correctAnswer = stripMacrons(answer);

    if (userAnswer == correctAnswer) {
        skippable = false;

        response.style.color = "#5cdd5c";

        advancer.innerHTML = "Next!";
        advancer.style.backgroundColor = "#5cdd5c";

        response.disabled = true;
        advancer.focus();
    } else if (forceReveal) {
        // Incorrect answer or Reveal (only if forced)
        skippable = false;

        response.style.color = "#dd5c5c";
        response.value = decodeHTML(answer); // Reveal correct answer

        advancer.innerHTML = "Next!";
        advancer.style.backgroundColor = "#dd5c5c";

        response.disabled = true;
        advancer.focus();
    }

    if (userAnswer == correctAnswer || forceReveal) {
        main.insertAdjacentHTML("beforeend", `<br><span style="font-size:12px;font-weight:lighter;line-height:1.15;display:block;">(${task})</span>`);
    }
}


// Attach Start button listener
if (advancer) {
    advancer.addEventListener("click", () => {
        if (typeof play === "function") {
            // Logic based on button text
            if (advancer.innerHTML === "Start!" || advancer.innerHTML === "Next!") {
                play();
            } else if (advancer.innerHTML === "Reveal") {
                stop(true); // Force reveal on button click
            }
        }
    });
}

// Event listener for input to stop speech and check answer
if (response) {
    response.addEventListener("input", () => {
        // Always stop speech on input
        if (playing) {
            speechSynthesis.cancel();
            playing = false;
        }

        // Check if correct (no force reveal)
        stop(false);
    });

    // Allow Enter to submit/reveal
    response.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent default
            stop(true); // Force reveal if Enter pressed
        }
    });
}

// Close dialogs when clicking outside
const dialogs = document.querySelectorAll("dialog");
dialogs.forEach(dialog => {
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
});

function openDialog(id) {
    const dialog = document.getElementById(id);
    if (dialog) {
        dialog.showModal();
        updateScrollButton(dialog);
    } else {
        console.error("Dialog not found: " + id);
    }
}

function closeDialog(id) {
    const dialog = document.getElementById(id);
    if (dialog) {
        dialog.close();
    } else {
        console.error("Dialog not found: " + id);
    }
}

function updateScrollButton(dialog) {
    const scrollButton = dialog.querySelector('.scroll');
    if (scrollButton) {
        // Check if content overflows (scrollHeight > clientHeight)
        // We might need to check the parent if the button is absolute/fixed, 
        // but based on valid context, the dialog itself scrolls.
        // If the scroll button is inside the dialog, we want to know if the dialog has scrollbars.
        if (dialog.scrollHeight > dialog.clientHeight) {
            scrollButton.style.display = ''; // Use default display
        } else {
            scrollButton.style.display = 'none';
        }
    }
}

window.addEventListener('resize', () => {
    document.querySelectorAll('dialog[open]').forEach(dialog => {
        updateScrollButton(dialog);
    });
});

function decodeHTML(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}