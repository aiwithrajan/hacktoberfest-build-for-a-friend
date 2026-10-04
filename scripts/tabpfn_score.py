#!/usr/bin/env python3
"""Optional: score subscription CSV with Prior Labs TabPFN (local install).

  pip install tabpfn pandas
  python scripts/tabpfn_score.py path/to/statement.csv

When tabpfn is installed, prints JSON { "tabpfn": true, "rows": N }.
Otherwise prints { "tabpfn": false, "error": "..." } for honest UI fallback.
"""

from __future__ import annotations

import json
import sys


def main() -> None:
    if len(sys.argv) < 2:
        print(json.dumps({"tabpfn": False, "error": "usage: tabpfn_score.py <csv>"}))
        sys.exit(1)

    csv_path = sys.argv[1]
    try:
        import pandas as pd
        from tabpfn import TabPFNClassifier  # noqa: F401
    except ImportError as exc:
        print(
            json.dumps(
                {
                    "tabpfn": False,
                    "error": f"Install tabpfn and pandas for full scoring: {exc}",
                }
            )
        )
        sys.exit(0)

    df = pd.read_csv(csv_path)
    # HF26: feature matrix hook — extend with labeled merchant clusters for production.
    print(
        json.dumps(
            {
                "tabpfn": True,
                "rows": len(df),
                "note": "TabPFN runtime available; extend script with TabPFNClassifier fit.",
            }
        )
    )


if __name__ == "__main__":
    main()
